export interface IBduiElements {
    button: IBduiButton;
    text: IBduiText;
    textInput: IBduiTextInput;
}

export interface IBduiText {
    type: "text";
    headerPath?: string;
    contentPath: string;
}

export interface IBduiButton {
    type: "button";
    value?: string;
    label?: string;
    outputPath?: string;
}

export interface IBduiTextInput {
    type: "textInput";
    defaultValue?: string;
    outputPath?: string;
    placeholder?: string;
}
