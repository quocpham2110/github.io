"use strict";

(function (core) {

    class User {

        constructor(displayName = "", emailAddress = "", username = "", password = "") {
            this.displayName = displayName;
            this.emailAddress = emailAddress;
            this.username = username;
            this._password = password;
        }

        get displayName() {
            return this._displayName
        }

        set displayName(displayName) {
            this._displayName = displayName;
        }

        get emailAddress() {
            return this._emailAddress
        }

        set emailAddress(emailAddress) {
            this._emailAddress = emailAddress;
        }

        get username() {
            return this._username
        }

        set username(username) {
            this._username = username;
        }

        toString() {
            return `DisplayName: ${this.displayName}\n
                    EmailAddress: ${this.emailAddress}\n
                    Username: ${this.username}\n`
        }

        toJSON() {
            return JSON.stringify({
                DisplayName: this.displayName,
                EmailAddress: this.emailAddress,
                Username: this.username,
                Password: this._password
            });
        }

        fromJSON(json) {
            const data = JSON.parse(json);
            this.displayName = data.DisplayName;
            this.emailAddress = data.EmailAddress;
            this.username = data.Username;
            this._password = data.Password;
        }

        serialize() {
            if (this.displayName !== "" &&
                this.emailAddress !== "" &&
                this.username !== ""
            ) {
                return `${this.displayName}, ${this.emailAddress}, ${this.username}`;
            }
            console.log("[ERROR] Failed to serialize. One or more user properties are missing")
        }

        deserialize(data) {
            const properties = data.split(",")
            if (properties.length === 3) {
                this.displayName = properties[0]
                this.emailAddress = properties[1]
                this.username = properties[2]
            } else {
                console.log("[ERROR] Data is in incorrect format")
            }
        }
    }

    core.User = User;
})(core || (core = {}))