"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppStage = void 0;
var AppStage;
(function (AppStage) {
    AppStage["Dev"] = "dev";
    AppStage["Test"] = "test";
    AppStage["Prod"] = "prod";
})(AppStage || (AppStage = {}));
function getAppStage() {
    // Stage can be set by either NODE_ENV or STAGE
    // STAGE variable takes priority and is expected to be set by CDK
    const stageStr = process.env.STAGE ? process.env.STAGE : process.env.NODE_ENV;
    switch (stageStr === null || stageStr === void 0 ? void 0 : stageStr.toLowerCase()) {
        case 'test':
            return AppStage.Test;
        case 'prod':
            return AppStage.Prod;
        default:
            return AppStage.Dev;
    }
}
exports.getAppStage = getAppStage;
exports.default = AppStage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwX3N0YWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnN0YW50L2FwcF9zdGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFLLFFBSUo7QUFKRCxXQUFLLFFBQVE7SUFDWCx1QkFBVyxDQUFBO0lBQ1gseUJBQWEsQ0FBQTtJQUNiLHlCQUFhLENBQUE7QUFDZixDQUFDLEVBSkksUUFBUSxLQUFSLFFBQVEsUUFJWjtBQUVELFNBQWdCLFdBQVc7SUFDekIsK0NBQStDO0lBQy9DLGlFQUFpRTtJQUNqRSxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQzlFLFFBQVEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFdBQVcsRUFBRSxFQUFFO1FBQy9CLEtBQUssTUFBTTtZQUNULE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztRQUN2QixLQUFLLE1BQU07WUFDVCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDdkI7WUFDRSxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUM7S0FDdkI7QUFDSCxDQUFDO0FBWkQsa0NBWUM7QUFFRCxrQkFBZSxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJlbnVtIEFwcFN0YWdlIHtcbiAgRGV2ID0gJ2RldicsXG4gIFRlc3QgPSAndGVzdCcsXG4gIFByb2QgPSAncHJvZCdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFwcFN0YWdlKCkgOiBBcHBTdGFnZSB7XG4gIC8vIFN0YWdlIGNhbiBiZSBzZXQgYnkgZWl0aGVyIE5PREVfRU5WIG9yIFNUQUdFXG4gIC8vIFNUQUdFIHZhcmlhYmxlIHRha2VzIHByaW9yaXR5IGFuZCBpcyBleHBlY3RlZCB0byBiZSBzZXQgYnkgQ0RLXG4gIGNvbnN0IHN0YWdlU3RyID0gcHJvY2Vzcy5lbnYuU1RBR0UgPyBwcm9jZXNzLmVudi5TVEFHRSA6IHByb2Nlc3MuZW52Lk5PREVfRU5WO1xuICBzd2l0Y2ggKHN0YWdlU3RyPy50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAndGVzdCc6XG4gICAgICByZXR1cm4gQXBwU3RhZ2UuVGVzdDtcbiAgICBjYXNlICdwcm9kJzpcbiAgICAgIHJldHVybiBBcHBTdGFnZS5Qcm9kO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gQXBwU3RhZ2UuRGV2O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFN0YWdlO1xuIl19