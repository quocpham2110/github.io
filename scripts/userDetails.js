"use strict";
/**
 * Represents a UserDetails with a name, email address, and preferred role
 */
export class UserDetails {
    _fullName;
    _emailAddress;
    _preferredRole;
    /**
     * Constructs a new UserDetails instance
     * @param fullName
     * @param emailAddress
     * @param preferredRole
     */
    constructor(fullName = "", emailAddress = "", preferredRole = "") {
        this._fullName = fullName;
        this._emailAddress = emailAddress;
        this._preferredRole = preferredRole;
    }
    /**
     * Get the full name of the signed-up user
     * @returns {string}
     */
    get fullName() {
        return this._fullName;
    }
    /**
     * Set the full name of the signed-up user. Validates input to ensure it's a non-empty string
     * @param fullName
     */
    set fullName(fullName) {
        if (fullName.trim() === "") {
            throw new Error("Invalid full name: must be non-empty string.");
        }
        this._fullName = fullName;
    }
    /**
     * Get the email address of the signed-up user
     * @returns {string}
     */
    get emailAddress() {
        return this._emailAddress;
    }
    /**
     * Set the email address of the signed-up user. Validates input to ensure it's a standard email format
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
     * Get the preferred role of the signed-up user
     * @returns {string}
     */
    get preferredRole() {
        return this._preferredRole;
    }
    /**
     * Set the preferred role of the signed-up user. Validates input to ensure it's a 10-digit number
     * @param preferredRole
     */
    set preferredRole(preferredRole) {
        if (preferredRole.trim() === "") {
            throw new Error("Invalid preferred role: must be non-empty string.");
        }
        this._preferredRole = preferredRole;
    }
}
//# sourceMappingURL=userDetails.js.map