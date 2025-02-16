"use strict";

/**
 * Represents a Contact with a name, contact number and email address
 */

(function (core) {

    class Contact {
        /**
         * Constructs a new Contact instance
         * @param fullName
         * @param contactNumber
         * @param emailAddress
         */
        constructor(fullName = "", contactNumber = "", emailAddress = "") {
            this._fullName = fullName;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
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
         * Get the contact number of the contact
         * @returns {string}
         */
        get contactNumber() {
            return this._contactNumber;
        }

        /**
         * Set the contact number of the contact. Validates input to ensure it's a 10-digit number
         * @param contactNumber
         */
        set contactNumber(contactNumber) {
            const contactPattern = new RegExp(/^\d{3}-\d{3}-\d{4}$/); // 437-888-8888
            if (!contactPattern.test(contactNumber)) {
                throw new Error("Invalid contact number: must be a 10-digit number.");
            }
            this._contactNumber = contactNumber;

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
         * Converts the contact details into human-readable string
         * @returns {string}
         */
        toString() {
            return `Full Name : ${this._fullName}\n
        Contact Number: ${this._contactNumber}\n
        Email Address: ${this._emailAddress}`
        }

        /**
         * Serializes the contact details into a string format suitable for storage
         * @returns {string|null}
         */
        serialize() {
            if (!this._fullName || !this._contactNumber || !this._emailAddress) {
                console.error("One or more of the contact properties are missing or invalid")
                return null;
            }

            return `${this._fullName},${this._contactNumber},${this._emailAddress}`;
        }

        /**
         * Deserializes a string (comma-delimited) of contact details and update properties
         * @param data
         */
        deserialize(data) {
            if (typeof data !== "string" || data.split(",").length !== 3) {
                console.error("Invalid data format for deserializing data.");
                return;
            }

            const [fullName, contactNumber, emailAddress] = data.split(",");
            this._fullName = fullName;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
        }
    }

    core.Contact = Contact;
})(core || (core = {}));