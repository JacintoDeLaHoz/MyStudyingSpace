// accountManager.js
import { LightningElement, wire, api } from "lwc";
import { createRecord, getRecord, getFieldValue } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import PHONE_FIELD from "@salesforce/schema/Account.Phone";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";

export default class AccountDetails extends LightningElement {
  @api recordId;
  accountName = "";
  accountPhone = "";
  accountIndustry = "";
  newAccountData;

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [NAME_FIELD, PHONE_FIELD, INDUSTRY_FIELD]
  })
  wiredAccount({ error, data }) {
    if (data) {
      this.accountName = getFieldValue(data, NAME_FIELD);
      this.accountPhone = getFieldValue(data, PHONE_FIELD);
      this.accountIndustry = getFieldValue(data, INDUSTRY_FIELD);
    } else if (error) {
      console.error("Error retrieving account", error);
    }
  }

  @wire(createRecord, {
    apiName: ACCOUNT_OBJECT.objectApiName,
    fields: "$newAccountData"
  })
  wiredCreateAccount(result) {
    if (result.data) {
      // eslint-disable-next-line @lwc/lwc/no-api-reassignments
      // this.recordId = result.data.id;
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Success",
          message: "Account created",
          variant: "success"
        })
      );
      this.resetForm();
    } else if (result.error) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Error creating record",
          message: result.error.body.message,
          variant: "error"
        })
      );
    }
  }

  handleNameChange(event) {
    this.accountName = event.target.value;
  }

  handlePhoneChange(event) {
    this.accountPhone = event.target.value;
  }

  handleIndustryChange(event) {
    this.accountIndustry = event.target.value;
  }

  createAccount() {
    this.newAccountData = {
      [NAME_FIELD.fieldApiName]: this.accountName,
      [PHONE_FIELD.fieldApiName]: this.accountPhone,
      [INDUSTRY_FIELD.fieldApiName]: this.accountIndustry
    };
  }

  resetForm() {
    this.accountName = "";
    this.accountPhone = "";
    this.accountIndustry = "";
    this.newAccountData = undefined;
  }
}
