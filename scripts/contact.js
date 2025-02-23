"use strict"

/**
 * Represents a Contact with a name, email address, subject and message
 */
class Contact {
    /**
     * Constructs a new Contact instance
     * @param fullName
     * @param emailAddress
     * @param subject
     * @param message
     */
    constructor(fullName = "", emailAddress = "", subject = "", message = "") {
        this.fullName = fullName;
        this.emailAddress = emailAddress;
        this.subject = subject;
        this.message = message;
    }

    /**
     * Get the full name of the contact
     * @returns {string}
     */
    get fullName() {
        return this._fullName;
    }

    /**
     * Set the full name of the contact. Validates input to ensure it's a non-empty string
     * @param fullName
     */
    set fullName(fullName) {
        if (typeof fullName !== "string" || fullName.trim() === "") {
            throw new Error("Invalid full name: must be non-empty string.");
        }
        this._fullName = fullName;
    }

    /**
     * Get the email address of the contact
     * @returns {string}
     */
    get emailAddress() {
        return this._emailAddress;
    }

    /**
     * Set the email address of the contact. Validates input to ensure it's a standard email format
     * @param emailAddress
     */
    set emailAddress(emailAddress) {
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
    get subject() {
        return this._subject;
    }

    /**
     * Set the subject. Validates input to ensure it's a non-empty string
     * @param subject
     */
    set subject(subject) {
        if (typeof subject !== "string" || subject.trim() === "") {
            throw new Error("Invalid subject: must be non-empty string.");
        }
        this._subject = subject;
    }

    /**
     * Get the message
     * @returns {string}
     */
    get message() {
        return this._message;
    }

    /**
     * Set the message. Validates input to ensure it's a non-empty string
     * @param message
     */
    set message(message) {
        if (typeof message !== "string" || message.trim() === "") {
            throw new Error("Invalid message: must be non-empty string.");
        }
        this._message = message;
    }
}
