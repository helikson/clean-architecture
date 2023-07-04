export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification {
    private _errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps) {
        this._errors.push(error);
    }

    hasErrors(): boolean {
        return this._errors.length > 0;
    }

    get errors(): NotificationErrorProps[] {
        return this._errors;
    }

    messages(context?: string): string {
        const messages = this._errors
            .filter(error => error.context === context || context === undefined)
            .map(error => `${error.context}: ${error.message}`);

        return messages.join(", ");
    }
}
