using { timesheet as ts } from '../db/schema';

@path : '/service/timesheet'
service timeSheetSSI
{
    entity SSIUserDetails as
        projection on ts.SSIUserDetails excluding { Password };

    entity SSITimeSheetData as
        projection on ts.SSITimeSheetData;

    action previous(
        curMon: String
    )
    returns String;

    action next(
        curSun: String
    )
    returns String;

    action save(
        timeSheetDetails: String
    )
    returns String;

    action login(
        userName: String,
        password: String
    )
    returns String;

     action newUser(
        password: String,
        emailId:String,
        personName:String,
        title:String
    )
    returns String
}

annotate timeSheetSSI with @requires :
[
    'authenticated-user'
];
