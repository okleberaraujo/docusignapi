namespace db;

/*
    Beg DB Tables
*/

entity ACCDOCUSIGN {
    key ACC_ID : Integer;
    ACC_GUID : String;
    API_ID : String;
    EMAIL : String;
    PASS : String;
    BASE_URI : String;
}

entity ACC_APPLICATIONS {
    key ACC_ID : Integer;
    key APP_NAME : Integer;
    INTGR_KEY : String;
    KPR_GUID : String;
    PBLC_KEY : String;
    PRVT_KEY : String;
    JWT_BEGDA : String;
    JWT_ENDDA : String;
    JWT_TOKEN : String;
    ACTIVE : Boolean;
};

/*
    End DB Tables
*/

/*
    Beg DB Views
*/
view USER_APPS as
    select from ACCDOCUSIGN as ACC 
        left outer join ACC_APPLICATIONS as APP on ACC.ACC_ID = APP.ACC_ID {
            key ACC.ACC_ID,
            ACC.ACC_GUID,
            ACC.API_ID,
            ACC.BASE_URI,
            ACC.EMAIL,
            ACC.PASS,
            APP.APP_NAME,
            APP.INTGR_KEY,
            APP.KPR_GUID,
            APP.PBLC_KEY,
            APP.PRVT_KEY,
            APP.JWT_BEGDA,
            APP.JWT_ENDDA,
            APP.JWT_TOKEN,
            APP.ACTIVE
    };
/*
    End DB Views
*/