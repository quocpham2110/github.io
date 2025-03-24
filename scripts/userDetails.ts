"use strict"

/**
 * Represents a UserDetails with a name, email address, and preferred role
 */
export class UserDetails {

    private _fullName: string;
    private _emailAddress: string;
    private _preferredRole: string;

    /**
     * Constructs a new UserDetails instance
     * @param fullName
     * @param emailAddress
     * @param preferredRole
     */
    constructor(fullName: string = "", emailAddress: string = "", preferredRole: string = "",) {
        this._fullName = fullName;
        this._emailAddress = emailAddress;
        this._preferredRole = preferredRole;
    }

    /**
     * Get the full name of the signed-up user
     * @returns {string}
     */
    get fullName(): string {
        return this._fullName;
    }

    /**
     * Set the full name of the signed-up user. Validates input to ensure it's a non-empty string
     * @param fullName
     */
    set fullName(fullName: string) {
        if (fullName.trim() === "") {
            throw new Error("Invalid full name: must be non-empty string.");
        }
        this._fullName = fullName;
    }

    /**
     * Get the email address of the signed-up user
     * @returns {string}
     */
    get emailAddress(): string {
        return this._emailAddress;
    }

    /**
     * Set the email address of the signed-up user. Validates input to ensure it's a standard email format
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
     * Get the preferred role of the signed-up user
     * @returns {string}
     */
    get preferredRole(): string {
        return this._preferredRole;
    }

    /**
     * Set the preferred role of the signed-up user. Validates input to ensure it's a 10-digit number
     * @param preferredRole
     */
    set preferredRole(preferredRole: string) {
        if (preferredRole.trim() === "") {
            throw new Error("Invalid preferred role: must be non-empty string.");
        }
        this._preferredRole = preferredRole;

    }
}
