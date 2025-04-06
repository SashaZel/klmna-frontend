import { Card, CardDescription, CardHeader } from "../ui/card";

export const Docs = () => {
    return (
        <>
            <section className="mt-[200px] text-white text-xl">
                <h2>Klmna docs</h2>
                <p>Klmna is a tool for creating BDUI templates for create learn for the ML piplines</p>
                <p>You can easily update and run tasks in this app</p>
            </section>
            <Card className="mt-4">
                <CardHeader className="text-l">Available templates</CardHeader>
                <CardDescription className="p-4">You can create templates </CardDescription>
            </Card>
            <Card className="mt-4">
                <CardHeader className="text-l">{'"Button" element'}</CardHeader>
                <CardDescription className="p-4">task template</CardDescription>
                <div className="mt-4 p-8">
                    <pre>
                        {`
    [
        {
            "type": "text",
            "headerPath": "header",
            "contentPath": "content"
        },
        {
            "type": "button",
            "value": "no",
            "label": "Нет"
        },
        {
            "type": "button",
            "value": "yes",
            "label": "Да"
        }
    ]
`}
                    </pre>
                </div>
                <CardDescription className="p-4">task example</CardDescription>
                <div className="mt-4 p-8">
                    <pre>
                        {`
    {
        "header": "Вы слышали такую поговорку?",
        "content": "''Без труда не выловишь рыбку из пруда"
    }
        `}
                    </pre>
                </div>
            </Card>
        </>
    );
};
