import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { IDataProps, newChart } from "./LineChartCustomPCF";
import * as React from "react";

export class LineChart2 implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private _context: ComponentFramework.Context<IInputs>;

    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this._context = context
    }

    private undefinedIfZero(property: ComponentFramework.PropertyTypes.Property) {
        return property.raw && property.raw > 0 ? property.raw : undefined;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const props: IDataProps = {
             appContext: this._context,
             title: context.parameters.title.raw ?? " ",
             displayTitle: context.parameters.displayTitle.raw,
             fontSize: this.undefinedIfZero(context.parameters.titleFontSize),
             bottomPadding: this.undefinedIfZero(context.parameters.titlePaddingbottom),
             topPadding: this.undefinedIfZero(context.parameters.titlePaddingTop),
             displayTooltips: context.parameters.displayTooltip.raw,
            lineColor: this._context.parameters.lineColor.raw ?? " ",
            lineColor2: this._context.parameters.lineColor2.raw ?? " "
            

            };
        return React.createElement(
           newChart, props
        );
    }

    public getOutputs(): IOutputs {
        return { };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
