"use strict"

/**
 * Represents a Contact with a name, email address, subject and message
 */
export class Contact {

    private _fullName: string = "";
    private _emailAddress: string = "";
    private _subject: string = "";
    private _message: string = "";

    /**
     * Constructs a new Contact instance
     * @param fullName
     * @param emailAddress
     * @param subject
     * @param message
     */
    constructor(fullName: string = "", emailAddress: string = "", subject: string = "", message: string = "") {
        this.fullName = fullName;
        this.emailAddress = emailAddress;
        this.subject = subject;
        this.message = message;
    }

    /**
     * Get the full name of the contact
     * @returns {string}
     */
    get fullName(): string {
        return this._fullName;
    }

    /**
     * Set the full name of the contact. Validates input to ensure it's a non-empty string
     * @param fullName
     */
    set fullName(fullName: string) {
        if (fullName.trim() === "") {
            throw new Error("Invalid full name: must be non-empty string.");
        }
        this._fullName = fullName;
    }

    /**
     * Get the email address of the contact
     * @returns {string}
     */
    get emailAddress(): string {
        return this._emailAddress;
    }

    /**
     * Set the email address of the contact. Validates input to ensure it's a standard email format
     * @param emailAddress
     */
    set emailAddress(emailAddress: string) {
        // const emailPattern = new RegExp(/^\w+@\w{3,}\.\w{2,4}$/);
        const emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        if (!emailPattern.test(emailAddress)) {
            throw new Error("Invalid email address: must be non-empty string.");
        }
        this._emailAddress = emailAddress;
    }

    /**
     * Get the subject
     * @returns {string}
     */
    get subject(): string {
        return this._subject;
    }

    /**
     * Set the subject. Validates input to ensure it's a non-empty string
     * @param subject
     */
    set subject(subject: string) {
        if (subject.trim() === "") {
            throw new Error("Invalid subject: must be non-empty string.");
        }
        this._subject = subject;
    }

    /**
     * Get the message
     * @returns {string}
     */
    get message(): string {
        return this._message;
    }

    /**
     * Set the message. Validates input to ensure it's a non-empty string
     * @param message
     */
    set message(message: string) {
        if (message.trim() === "") {
            throw new Error("Invalid message: must be non-empty string.");
        }
        this._message = message;
    }
}
