import {  makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../../models/activity";
import agent from "../api/agent";
import { v4 as uuidv4 } from 'uuid';

export default class ActivityStore {
  //  activities:Activity[]=[];
    activityRegistery=new Map<String,Activity>();
    selectedActivity:Activity|undefined=undefined;
    editMode=false;
    loading=false;
    loadingInitial=true;
    submitting=false;
    constructor() {
       
        makeAutoObservable(this);
    }

    get ActivityByDate(){
        return Array.from(this.activityRegistery.values()).sort((a,b)=>Date.parse(a.date)-Date.parse(b.date));
    }
    loadingActivities =async () =>{
       
        try {

            const activites=await agent.Activities.list();
            activites.forEach(activity=>{
                activity.date=activity.date.split('T')[0];
                //this.activities.push(activity);
                this.activityRegistery.set(activity.id,activity);
              })
              this.setLoadingInitial(false);
            
        } catch (error) {
            console.log("get activites",error);
        }
    }

    setLoadingInitial=(state:boolean)=>{
        this.loadingInitial=state;
    }

    SelectActivity=(id:string)=>{
       // this.selectedActivity=  this.activities.find(x=>x.id===id);
        this.activityRegistery.get(id);
    }

    CancelSelectedActivity=()=>{
        this.selectedActivity=undefined;
    }

    openForm=(id?  :string)=>{
        id?this.SelectActivity(id):this.CancelSelectedActivity();
        this.setEditMode(true);
    }

    setEditMode=(state:boolean)=>{
        this.editMode=state;

    }
    setSubmitting=(state:boolean)=>{
        this.submitting=state;
    }
    closeForm=()=>{
        this.setEditMode(false);
    }
    

    deleteActivity=async (id:string)=>{
       
        this.loading=true;

        try {
            await agent.Activities.delete(id);
            runInAction(()=>{
               // this.activities=[...this.activities.filter(a=>a.id!==id)];   
               this.activityRegistery.delete(id); 
                if(this.selectedActivity?.id===id)this.CancelSelectedActivity() ;
                this.loading=false;
            })
            
        } catch (error) {
            console.log("delete ",error);
            runInAction(()=>{
                this.loading=false;
            })
        }
       
        
       

    }

    createActivity=async (activity:Activity)=>{
        this.loading=true;
        activity.id=uuidv4();
        try {
            await agent.Activities.create(activity);
            runInAction(()=>{
               // this.activities.push(activity);
               this.activityRegistery.set(activity.id,activity); 
               this.selectedActivity=activity;
                this.editMode=false;
                this.loading=false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }

    }

    updateActivity=async(activity:Activity)=>{
        this.loading=true;
        try {
            await agent.Activities.update(activity);
            runInAction(()=>{
                 //this.activities=[...this.activities.filter(a=>a.id!==activity.id),activity];
                 this.activityRegistery.set(activity.id,activity); 
                 this.selectedActivity=activity;
                 this.editMode=false;
                this.loading=false;

            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }



    
}



