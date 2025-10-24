import { useState } from "react"
import { Button } from "react-bootstrap"

function MessageInput({ onSend }) {
    const [text, setText] = useState("")

    const handleSend = (e) => {
        e.preventDefault()
        if (!text.trim()) return
        onSend(text)
        setText("")
    }

    return (
        <form
            onSubmit={handleSend}
            style={{
                display: "flex",
                gap: "8px",
                marginTop: "auto",
                paddingTop: "10px",
                borderTop: "1px solid #e2e8f0",
            }}
        >
            <input
                type="text"
                placeholder="Scrivi un messaggio..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{
                    flex: 1,
                    border: "1px solid #cbd5e1",
                    borderRadius: "12px",
                    padding: "8px 12px",
                }}
            />
            <Button type="submit">Invia</Button>
        </form>
    )
}

export default MessageInput
