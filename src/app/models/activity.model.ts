


export class Activity{
    private activity_type:String
    public timestamp:Date;
    private sourceId:number;
    private sourceType: "OmnyCard" | "DebitCard";
    private details: Record<string,any>

    constructor(activity_type:String,sourceType:"OmnyCard"|"DebitCard",sourceid:number,details:Record<string,any>){

        this.activity_type=activity_type;
        this.timestamp= new Date();
        this.sourceType = sourceType;
    this.sourceId = sourceid;
        this.details=details

    }
    public getActivityType():String{
        return this.activity_type;

    }
    // get the details of the 
    public getDetails(cardID:number):Record<string,any>{
        return this.details
    }

}

