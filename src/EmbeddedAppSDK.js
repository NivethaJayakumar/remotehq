
export const appContextUpdateEvent = 'application:displayContextChanged'; 
export const appShareStateUpdateEvent = 'application:shareStateChanged';
export const appThemeUpdateEvent = 'application:themeChanged';
export const meetingInfoUpdateEvent = 'meeting:infoChanged';
export const meetingRoleUpdateEvent = 'meeting:roleChanged';
export const spaceInfoUpdateEvent = 'space:infoChanged';

export default class EmbeddedAppSDK {
  constructor() {
    this.app = new window.Webex.Application();
  }

 async subscribe(eventName, callback) {
   await this.app.listen();

    switch(eventName) {
      case appContextUpdateEvent:
        this.app.on(appContextUpdateEvent, callback);
        break;
      case appShareStateUpdateEvent:
        this.app.on(appShareStateUpdateEvent, callback);
        break;
      case appThemeUpdateEvent:
        this.app.on(appThemeUpdateEvent, callback);
        break;
      case meetingInfoUpdateEvent:
        this.app.on(meetingInfoUpdateEvent, callback);
        break;
      case meetingRoleUpdateEvent:
        this.app.on(meetingRoleUpdateEvent, callback);
        break;
      case spaceInfoUpdateEvent:
        this.app.on(spaceInfoUpdateEvent, callback);
        break;
      default:
        break;
    }
  }

  getTheme() {
    return this.app.theme;
  }

  async onReady() {
    return this.app.onReady();
  }

  isAppBeingShared() {
    return this.app.isShared;
  }

  async getUser() {
    return this.app.context.getUser();
  }

  async getMeeting() {
    return this.app.context.getMeeting();
  }

  async getSpace() {
    return this.app.context.getSpace();
  }

  shareApp(url) {
    this.app.setShareUrl(url);
  }

  stopSharingApp(){
    this.app.clearShareUrl();
  }

}