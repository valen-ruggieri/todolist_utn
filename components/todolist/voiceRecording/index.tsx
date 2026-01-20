"use client"

import * as React from "react"
import type { Todo } from "@/lib/schemas/todo.schema"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { MicOff, Check, X } from "lucide-react"

interface VoiceRecordingProps {
    isRecording: boolean
    transcript: string
    onCancel: () => void
    onStop: () => void
    onSave: () => void
    canSave: boolean
}

export function VoiceRecording({
    isRecording,
    transcript,
    onCancel,
    onStop,
    onSave,
    canSave,
}: VoiceRecordingProps) {
    if (!isRecording) return null

    return (
        <Card className="border-2 border-primary">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                    Grabando...
                </CardTitle>
                <CardDescription>
                    Di tu tarea en voz alta. El texto aparecerá aquí mientras hablas.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="min-h-[120px] p-6 bg-muted rounded-lg border-2 border-dashed border-primary/30">
                    <p className="text-lg font-medium text-center">
                        {transcript || (
                            <span className="text-muted-foreground">
                                Esperando tu voz...
                            </span>
                        )}
                    </p>
                </div>

                <div className="flex gap-3 justify-center">
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        size="lg"
                    >
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onStop}
                        size="lg"
                    >
                        <MicOff className="h-4 w-4 mr-2" />
                        Parar
                    </Button>
                    <Button
                        onClick={onSave}
                        disabled={!canSave}
                        size="lg"
                    >
                        <Check className="h-4 w-4 mr-2" />
                        Guardar
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
