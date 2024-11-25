export interface IBduiElements {
   button: IBduiButton;
   text: IBduiText;
   textInput: IBduiTextInput;
}

export interface IBduiText {
    type: "text",
    header?: string;
    content: string;
}

export interface IBduiButton {
    type: "button",
    value?: string;
    label?: string;
    onClickOutputPath?: string;
}

export interface IBduiTextInput {
    type: "textInput",
    defaultValue?: string;
    onChangeOutputPath?: string;
    placeholder?: string;
}