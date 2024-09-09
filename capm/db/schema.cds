namespace timesheet;

entity SSIUserDetails
{
    key EmailId : String(100);
    PersonName : String(100);
    Title : String(100);
    Password: String;
    SSITimeSheetData : Association to many SSITimeSheetData on SSITimeSheetData.ssiUserDetails = $self;
}

entity SSITimeSheetData
{
    key EntryDate : Date;
    Issue : Integer;
    Enhancement : Integer;
    NewInnovation : Integer;
    Comments : String(100);
    key ssiUserDetails : Association to one SSIUserDetails;
}
