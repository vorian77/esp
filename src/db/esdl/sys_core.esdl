module sys_core {
  type ObjRoot {
    multi attributes: sys_core::SysAttr {
      on source delete delete target;
    };
    note: str;
     
    # test fields
    testBool: bool;
    multi testCodeMulti: sys_core::SysCode;
    testCodeSingle: sys_core::SysCode;
    testDate: cal::local_date;
    testDateTime: cal::local_datetime;
    testNumberFloat: float64;
    testNumberInt: int64;
    testText: str;
  }

  type ObjRootCore extending sys_core::ObjRoot {
    codeIcon: sys_core::SysCode;
    codeObjType: sys_core::SysCode;
    header: str;
    required name: str;
    orderDefine: default::nonNegative;
  }

  type SysAttr extending sys_user::Mgmt {
    required hasAccess: bool;
    required obj: sys_core::SysObjEntAttr{
      on target delete delete source;
    };
  }
  
  type SysObj extending sys_core::ObjRootCore, sys_user::Mgmt {
    isGlobalResource: bool;
    required owner: sys_core::SysSystem;
    constraint exclusive on ((.owner, .name));
  } 

  type SysObjEnt extending sys_core::SysObj {
    addr1: str;
    addr2: str;
    city: str;
    codeState: sys_core::SysCode;
    multi contacts: default::SysPerson{
      on source delete delete target;
      on target delete allow;
    };
    email: str;
    multi notes: sys_core::SysObjNote{
      on source delete delete target;
      on target delete allow;
    };
    website: str;
    zip: str;
    trigger sys_user_delete after delete for each do (
      delete default::SysPerson filter .id not in (app_cm::CmClient.person.id union sys_core::SysObjEnt.contacts.id union sys_user::SysUser.person.id)
    );
  }


  type SysObjEntAttr extending sys_core::SysObjEnt {}
 
  type SysObjNote extending sys_user::Mgmt {
    required date: cal::local_date;
    required codeType: sys_core::SysCode;
    note: str;
  }

  type SysOrg extending sys_core::ObjRootCore, sys_user::Mgmt {
    appName: str;
    file: json;
    logoMarginRight: float64;
    logoWidth: int16;
    users := .<orgs[is sys_user::SysUser];
    constraint exclusive on (.name);
  }

  type SysSystem extending sys_core::ObjRootCore, sys_user::Mgmt  {
    required owner: sys_core::SysOrg;
    constraint exclusive on ((.owner, .name));
  }


  # other sys_core objects
  type SysApp extending sys_core::SysObj {
    required appHeader: sys_core::SysAppHeader;
    multi nodes: sys_core::SysNodeObj {
       on target delete allow;
    };
  }

  type SysAppHeader extending sys_core::SysObj {}

  type SysCodeType extending sys_core::SysObj {
    parent: sys_core::SysCodeType;
    order: default::nonNegative;
    valueDecimal: float64;
    valueInteger: int64;
    valueString: str;
    constraint exclusive on ((.name));
  }

  type SysCode extending sys_core::ObjRootCore, sys_user::Mgmt {
    required owner: sys_core::SysSystem;
    parent: sys_core::SysCode;
    required codeType: sys_core::SysCodeType;
    multi codeTypeFamily: sys_core::SysCodeType;
    order: default::nonNegative;
    valueDecimal: float64;
    valueInteger: int64;
    valueString: str;
    constraint exclusive on ((.owner, .codeType, .name));
  }

  type SysCodeAction extending sys_core::SysCode {}

  # SysDataObj
  type SysDataObj extending sys_core::SysObj {
    actionGroup: sys_core::SysDataObjActionGroup;
    multi actionsQuery: sys_core::SysDataObjActionQuery {
      on source delete delete target;
      on target delete allow;
    };
    required codeCardinality: sys_core::SysCode;
    required codeComponent: sys_core::SysCode;
    codeDataObjType: sys_core::SysCode;
    codeListEditPresetType: sys_core::SysCode;
    
    multi columns: sys_core::SysDataObjColumn {
      on source delete delete target;
      on target delete allow;
    };

    description: str;
    exprFilter: str;
    exprObject: str;
    exprSort: str;
    exprWith: str;


    isDetailRetrievePreset: bool;
    isInitialValidationSilent: bool;
    required isListEdit: bool;
    isListSuppressFilterSort: bool;
    isListSuppressSelect: bool;
    isRetrieveReadonly: bool;
    
    listEditPresetExpr: str;
    listReorderColumn: sys_db::SysColumn;
  
    parentColumn: sys_db::SysColumn;
    parentFilterExpr: str;
    parentTable: sys_db::SysTable;
    
    processType: sys_core::SysCode;
    subHeader: str;

    multi tables: sys_core::SysDataObjTable {
      on source delete delete target;
      on target delete allow;
    };
    constraint exclusive on (.name);
  } 

  # dataObj-action
  type SysDataObjAction extending sys_user::Mgmt {
    required action: sys_user::SysUserAction;
    required codeColor: sys_core::SysCode;
    required isListRowAction: bool;
    required orderDefine: default::nonNegative;
  }
  type SysDataObjActionGroup extending sys_core::SysObj {
    multi dataObjActions: sys_core::SysDataObjAction {
      on source delete delete target;
      on target delete allow;
    };
    constraint exclusive on (.name);
  }

  # dataObj-action-query
  type SysDataObjActionQuery extending sys_user::Mgmt {
    required name: str;
    multi parms: SysDataObjActionQueryParm{
      on source delete delete target;
      on target delete allow;
    };
    multi triggers: SysDataObjActionQueryTrigger{
      on source delete delete target;
      on target delete allow;
    };
  }
  type SysDataObjActionQueryParm extending sys_user::Mgmt {
    required key: str;
    required value: str;
  }
  type SysDataObjActionQueryTrigger extending sys_user::Mgmt {
    required codeQueryType: sys_core::SysCode;
    required codeTriggerTiming: sys_core::SysCode;
  }

  # SysDataObjColumn
  type SysDataObjColumn extending sys_user::Mgmt {
    required column: sys_db::SysColumn;
    
    nameCustom: str;

    # fields - db
    attrAccess: bool;
    codeAttrType: sys_core::SysCode;
    codeDbDataSourceValue: sys_core::SysCode;
    codeSortDir: sys_core::SysCode;
    columnBacklink: sys_db::SysColumn;
    exprCustom: str;
    exprPreset: str;
    exprSave: str;
    exprSaveAttrObjects: str;

    indexTable: default::nonNegative;

    isDisplay: bool;
    isDisplayable: bool;
    required isExcludeInsert: bool;
    required isExcludeSelect: bool;
    required isExcludeUpdate: bool;
  
    # fields - el
    codeAccess: sys_core::SysCode;
    codeAlignmentAlt: sys_core::SysCode;
    codeColor: sys_core::SysCode;
    codeFieldElement: sys_core::SysCode;

    # custom
    action: sys_user::SysUserAction;
    actionAlertMsg: str;
    
    customColActionValue: str;
    customColAlign: str;
    customColIsSubHeader: bool;
    customColLabel: str;
    customColPrefix: str;
    customColRawHTML: str;
    customColSize: str;
    customColSource: str;
    customColSourceKey: str;

    multi customEmbedShellFields: sys_core::SysDataObjColumn {
      on target delete allow;
    };

    fieldEmbedListConfig: sys_core::SysDataObjFieldEmbedListConfig;
    fieldEmbedListEdit: sys_core::SysDataObjFieldEmbedListEdit;
    fieldEmbedListSelect: sys_core::SysDataObjFieldEmbedListSelect;
   
    fieldListItems: sys_core::SysDataObjFieldListItems;
    fieldListItemsParmValue: str;

    headerAlt: str;
    height: int16;
    inputMaskAlt: str;
    multi itemChanges: sys_core::SysDataObjColumnItemChange {
      on source delete delete target;
      on target delete allow;
    };
    isDisplayBlock: bool;
    multi items: sys_core::SysDataObjColumnItemValue {
      on source delete delete target;
      on target delete allow;
    };

     # link
    multi linkColumns: sys_core::SysDataObjColumnLink{
      on source delete delete target;
      on target delete allow;
    };
    linkTable: sys_db::SysTable;
    
    orderCrumb: default::nonNegative;
    required orderDefine: default::nonNegative;
    orderDisplay: default::nonNegative;
    orderSort: default::nonNegative;
    
    width: int16;
  }

  type SysDataObjColumnItemChange extending sys_user::Mgmt {
    codeAccess: sys_core::SysCode;
    codeOp: sys_core::SysCode;
    codeValueTarget: sys_core::SysCode;
    codeValueTrigger: sys_core::SysCode;
    required codeValueTypeTarget: sys_core::SysCode;
    required codeValueTypeTrigger: sys_core::SysCode;
    required column: sys_core::SysDataObjColumn {
      on target delete allow;
    };
    required orderDefine: default::nonNegative;
    selectParmValue: str;
    valueScalarTarget: str;
    valueScalarTrigger: str;
  }
  
  type SysDataObjColumnItemValue extending sys_user::Mgmt {
    required data: str;
    required display: str;
    required orderDefine: default::nonNegative;
  }
  
  type SysDataObjColumnLink extending sys_user::Mgmt {
    required column: sys_db::SysColumn;
    required orderDefine: default::nonNegative;
  }

  type SysDataObjFieldEmbedListConfig extending sys_core::SysObj {
    required actionGroupModal: sys_core::SysDataObjActionGroup {
      on target delete allow;
    }
    required dataObjEmbed: sys_core::SysDataObj {
      on source delete allow;
    };
    required dataObjModal: sys_core::SysDataObj {
      on source delete allow;
    };
    constraint exclusive on (.name);
  }

  type SysDataObjFieldEmbedListEdit extending sys_core::SysObj {
      required dataObjEmbed: sys_core::SysDataObj {
        on source delete allow;
      };
    constraint exclusive on (.name);
  }

  type SysDataObjFieldEmbedListSelect extending sys_core::SysObj {
    required actionGroupModal: sys_core::SysDataObjActionGroup {
      on target delete allow;
    }
    required btnLabelComplete: str;
    required dataObjList: sys_core::SysDataObj {
      on source delete allow;
    };
    constraint exclusive on (.name);
  }

  type SysDataObjFieldListItems extending sys_core::SysObj {
    codeDataTypeDisplay: sys_core::SysCode;
    codeMask: sys_core::SysCode;
    displayIdSeparator: str;
    exprFilter: str;
    exprSort: str;
    exprWith: str;
    multi props: sys_core::SysDataObjFieldListItemsProp {
      on source delete delete target;
      on target delete allow;
    };
    table: sys_db::SysTable;
    constraint exclusive on (.name);
  }

  type SysDataObjFieldListItemsProp  {
    required expr: str;
    required header: str;
    required isDisplayId: bool;
    required key: str;
    required orderDefine: default::nonNegative;
    orderSort: default::nonNegative;
  }
 
  type SysDataObjTable extending sys_user::Mgmt {
    multi columnsId: sys_db::SysColumn{
      on target delete allow;
    };  
    columnParent: sys_db::SysColumn;
    exprFilterUpdate: str;
    required index: default::nonNegative;
    indexParent: default::nonNegative;
    isTableExtension: bool;
    required table: sys_db::SysTable;
  }

  type SysDataObjWith extending sys_user::Mgmt {
    required index: default::nonNegative;
    required expr: str;
  }
  
  type SysMsg extending sys_core::ObjRoot {
    codeStatus: sys_core::SysCode;
    required createdAt: datetime {
      default := datetime_of_transaction();
      readonly := true;
    };
    date: cal::local_date;
    required isRead: bool;
    parent: sys_core::SysMsg;
    multi readers: default::SysPerson;
    multi recipients: default::SysPerson;
    required sender: default::SysPerson;
    subject: str;
  }

  type SysNodeObj extending sys_core::SysObj {
    required codeNavType: sys_core::SysCode;
    required codeNodeType: sys_core::SysCode;
    multi data: sys_core::SysNodeObjData {
       on target delete delete source;
    };
    dataObj: sys_core::SysDataObj {
      on target delete allow
    };
    required isAlwaysRetrieveData: bool;
    required isHideRowManager: bool;
    parent: sys_core::SysNodeObj{
       on target delete delete source;
    };
    page: str;
    constraint exclusive on (.name);
  }

  type SysNodeObjData {
    required dataObj: sys_core::SysDataObj{
      on target delete delete source;
    };
    required codeAction: sys_core::SysCodeAction;
  }

  # FUNCTIONS
  function getApp(name: str) -> optional sys_core::SysApp
     using (select assert_single((select sys_core::SysApp filter .name = name)));

  function getCodeType(codeTypeName: str) -> optional sys_core::SysCodeType
    using (select sys_core::SysCodeType filter .name = codeTypeName);

  function getCode(codeTypeName: str,  codeName: str) -> optional sys_core::SysCode
    using (select assert_single(sys_core::SysCode filter 
      .codeType.name = codeTypeName and .name = codeName));

  function getCodeAction(codeTypeName: str,  codeName: str) -> optional sys_core::SysCodeAction
    using (select assert_single(sys_core::SysCodeAction filter 
      .codeType.name = codeTypeName and .name = codeName));
      
  function getCodeSystem(sysName: str, codeTypeName: str,  codeName: str) -> optional sys_core::SysCode
    using (select assert_single(sys_core::SysCode filter 
      .owner.name = sysName and .codeType.name = codeTypeName and .name = codeName));

  function getDataObj(dataObjName: str) -> optional sys_core::SysDataObj
    using (select sys_core::SysDataObj filter .name = dataObjName);        
      
  function getDataObjActionGroup(name: str) -> optional sys_core::SysDataObjActionGroup
    using (select sys_core::SysDataObjActionGroup filter .name = name);        
      
  function getDataObjColumn(dataObjName: str, columnName: str) -> optional sys_core::SysDataObjColumn
    using (select assert_single((select sys_core::SysDataObjColumn filter .id in (select sys_core::SysDataObj filter .name = dataObjName).columns.id and .column.name = columnName)));        
   
  function getDataObjFieldEmbedListConfig(name: str) -> optional sys_core::SysDataObjFieldEmbedListConfig
    using (select sys_core::SysDataObjFieldEmbedListConfig filter .name = name);

  function getDataObjFieldEmbedListEdit(name: str) -> optional sys_core::SysDataObjFieldEmbedListEdit
    using (select sys_core::SysDataObjFieldEmbedListEdit filter .name = name);
  
  function getDataObjFieldEmbedListSelect(name: str) -> optional sys_core::SysDataObjFieldEmbedListSelect
    using (select sys_core::SysDataObjFieldEmbedListSelect filter .name = name);
      
  function getDataObjFieldListItems(name: str) -> optional sys_core::SysDataObjFieldListItems
    using (select sys_core::SysDataObjFieldListItems filter .name = name);    
  
  function getNodeObjByName(nodeObjName: str) -> optional sys_core::SysNodeObj
    using (select sys_core::SysNodeObj filter .name = nodeObjName);

  function getNodeObjById(nodeObjId: str) -> optional sys_core::SysNodeObj
    using (select sys_core::SysNodeObj filter .id = <uuid>nodeObjId);    

  function getObj(ownerName:str, name: str) -> optional sys_core::SysObj
    using (select assert_single((select sys_core::SysObj filter .owner.name = ownerName and .name = name)));

  function getObjEntAttr(ownerName:str, name: str) -> optional sys_core::SysObjEntAttr
    using (select assert_single((select sys_core::SysObjEntAttr filter .owner.name = ownerName and .name = name)));

  function getObjRootCore(name: str) -> optional sys_core::ObjRootCore
    using (select assert_single((select sys_core::ObjRootCore filter .name = name)));
    
  function getOrg(name: str) -> optional sys_core::SysOrg
    using (select assert_single((select sys_core::SysOrg filter .name = name)));

  function getSystem(nameOwner: str, nameSystem: str) -> optional sys_core::SysSystem
    using (select assert_single((select sys_core::SysSystem filter .owner.name = nameOwner and .name = nameOwner))); 
   
  function getSystemPrime(nameSystem: str) -> optional sys_core::SysSystem
    using (select assert_single((select sys_core::SysSystem filter .name = nameSystem))); 
 
  function isObjectLink(objName: str, linkName: str) -> optional bool
    using (select count(schema::ObjectType filter .name = objName and .links.name = linkName) > 0);     

  # <todo> migrate itemsList to functions rather than raw selects
  # have to beable to return an array from a function
  # function getItemsListCodeByCodeTypeName() -> array<Code>
  #     using (select Code );
}
