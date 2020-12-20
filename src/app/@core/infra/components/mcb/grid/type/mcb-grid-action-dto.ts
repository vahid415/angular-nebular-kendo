
export class McbGridAction {
  type?: string;
  text: string;
  inlineText?: boolean;
  icon?: string;
  actionClick: any;
  disable?: (dataItem: any) => any | boolean = () => false;
  visible?: (dataItem: any) => any | boolean = () => true;

  constructor(type, text: string,inlineText: boolean , icon: string, actionClick: any, disable: (dataItem: any) => any | boolean, visible: (dataItem: any) => any | boolean) {
    this.type = type;
    this.text = text;
    this.inlineText= inlineText;
    this.icon = icon;
    this.actionClick = actionClick;
    this.disable = disable;
    this.visible = visible;
  }
}
