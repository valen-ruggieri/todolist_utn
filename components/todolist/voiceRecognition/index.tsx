"use client"

import * as React from "react"

export function useVoiceRecognition() {
    const [isRecording, setIsRecording] = React.useState(false)
    const [transcript, setTranscript] = React.useState("")
    const [recognitionAvailable, setRecognitionAvailable] = React.useState(false)
    const recognitionRef = React.useRef<SpeechRecognition | null>(null)

    // Configurar reconocimiento de voz
    React.useEffect(() => {
        if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
            const SpeechRecognition =
                window.SpeechRecognition || window.webkitSpeechRecognition
            const recognition = new SpeechRecognition()
            recognition.continuous = true
            recognition.interimResults = true
            recognition.lang = "es-ES"

            recognition.onresult = (event: SpeechRecognitionEvent) => {
                let interimTranscript = ""
                let finalTranscript = ""

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript + " "
                    } else {
                        interimTranscript += transcript
                    }
                }

                setTranscript(finalTranscript + interimTranscript)
            }

            recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error("Error en reconocimiento de voz:", event.error)
                if (event.error === "no-speech") {
                    return
                }
                setIsRecording(false)
            }

            recognition.onend = () => {
                setIsRecording(false)
            }

            recognitionRef.current = recognition
            setRecognitionAvailable(true)
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop()
            }
        }
    }, [])

    const startRecording = () => {
        if (recognitionRef.current && !isRecording) {
            setTranscript("")
            setIsRecording(true)
            recognitionRef.current.start()
        }
    }

    const stopRecording = () => {
        if (recognitionRef.current && isRecording) {
            recognitionRef.current.stop()
            setIsRecording(false)
        }
    }

    const cancelRecording = () => {
        if (recognitionRef.current && isRecording) {
            recognitionRef.current.stop()
        }
        setTranscript("")
        setIsRecording(false)
    }

    const clearTranscript = () => {
        setTranscript("")
    }

    return {
        isRecording,
        transcript,
        recognitionAvailable,
        startRecording,
        stopRecording,
        cancelRecording,
        clearTranscript,
    }
}
