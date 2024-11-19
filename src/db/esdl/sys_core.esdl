module sys_core {
  # core objects
  type ObjRoot {
    addr1: str;
    addr2: str;
    avatar: json;
    city: str;
    codeObjType: sys_core::SysCode;
    codeState: sys_core::SysCode;
    multi contacts: default::SysPerson{
      on target delete allow;
    };
    email: str;
    header: str;
    required name: str;
    note: str;
    orderDefine: default::nonNegative;
    website: str;
    zip: str;
    
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

  type SysObj extending sys_core::ObjRoot, sys_user::Mgmt {
    isGlobalResource: bool;
    required owner: sys_core::SysSystem;
    constraint exclusive on ((.owner, .name));
  } 

  type SysObjNote extending sys_user::Mgmt {
    required date: cal::local_date;
    required codeType: sys_core::SysCode;
    required owner: sys_core::SysObj {
      on target delete delete source;
    };
    note: str;
  }

  type SysObjSubject extending sys_core::SysObj {
    required codeType: sys_core::SysCode;
  }


  type SysOrg extending sys_core::ObjRoot, sys_user::Mgmt {
    appName: str;
    codeLogoFileType: sys_core::SysCode;
    logoFileName: str;
    logoMarginRight: float64;
    logoWidth: int16;
    constraint exclusive on (.name);
  }

  type SysSystem extending sys_core::ObjRoot, sys_user::Mgmt  {
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

  type SysAppHeader extending sys_core::SysObj {
    codeIcon: sys_core::SysCode;
  }

  type SysCodeType extending sys_core::SysObj {
    parent: sys_core::SysCodeType;
    order: default::nonNegative;
    constraint exclusive on ((.name));
  }

  type SysCode extending sys_core::ObjRoot, sys_user::Mgmt {
    required owner: sys_core::SysSystem;
    parent: sys_core::SysCode;
    required codeType: sys_core::SysCodeType;
    order: default::nonNegative;
    valueDecimal: float64;
    valueInteger: int64;
    valueString: str;
    constraint exclusive on ((.owner, .codeType, .name));
  }

  # SysDataObj
  type SysDataObj extending sys_core::SysObj {
    actionFieldGroup: sys_core::SysDataObjActionFieldGroup;
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

    isDetailRetrievePreset: bool;
    required isListEdit: bool;
    isListSuppressFilterSort: bool;
    isListSuppressSelect: bool;
    
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

  type SysDataObjActionField extending sys_core::SysObj {
    multi actionFieldConfirms: SysDataObjActionFieldConfirm {
      on source delete delete target;
      on target delete allow;
    };
    multi actionFieldShows: SysDataObjActionFieldShow {
      on source delete delete target;
      on target delete allow;
    };
    required codeActionFieldTriggerEnable: sys_core::SysCode;
    required codePacketAction: sys_core::SysCode;
    codeColor: sys_core::SysCode;
    required isListRowAction: bool;
    constraint exclusive on (.name);
  }

  type SysDataObjActionFieldConfirm extending sys_user::Mgmt {
    required codeConfirmType: sys_core::SysCode;
    required codeTriggerConfirmConditional: sys_core::SysCode;
    confirmButtonLabelCancel: str;
    confirmButtonLabelConfirm: str;
    confirmMessage: str;
    confirmTitle: str;
  }

  type SysDataObjActionFieldGroup extending sys_core::SysObj {
    multi actionFieldItems: sys_core::SysDataObjActionFieldGroupItem {
      on source delete delete target;
      on target delete allow;
    };
    constraint exclusive on (.name);
  }
  
 type SysDataObjActionFieldGroupItem extending sys_user::Mgmt {
    required action: sys_core::SysDataObjActionField;
    required orderDefine: default::nonNegative;
  }

  type SysDataObjActionFieldShow extending sys_user::Mgmt {
    required codeTriggerShow: sys_core::SysCode;
    required isRequired: bool;
  }

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
    codeDbDataOp: sys_core::SysCode;
    codeDbDataSourceValue: sys_core::SysCode;
    codeSortDir: sys_core::SysCode;
    columnBacklink: sys_db::SysColumn;
    exprCustom: str;
    exprPreset: str;

    indexTable: default::nonNegative;
    indexWith: default::nonNegative;

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

    customColActionMethod: str;
    customColActionType: str;
    customColActionValue: str;
    customColAlign: str;
    customColCodeColor: sys_core::SysCode;
    customColIsSubHeader: bool;
    customColLabel: str;
    customColPrefix: str;
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
    fieldListItemsParmName: str;

    headerAlt: str;
    height: int16;
    isDisplayBlock: bool;
    multi items: sys_core::SysDataObjColumnItem {
      on source delete delete target;
      on target delete allow;
    };

     # link
    multi linkColumns: sys_core::SysDataObjColumnLink{
      on source delete delete target;
      on target delete allow;
    };
    linkExprPreset: str;
    linkExprSave: str;
    linkExprSelect: str;
    linkTable: sys_db::SysTable;
    
    orderCrumb: default::nonNegative;
    required orderDefine: default::nonNegative;
    orderDisplay: default::nonNegative;
    orderSort: default::nonNegative;
    
    width: int16;
  }

  type SysDataObjColumnItem extending sys_user::Mgmt {
    required data: str;
    required display: str;
    required orderDefine: default::nonNegative;
  }

  type SysDataObjColumnLink extending sys_user::Mgmt {
    required column: sys_db::SysColumn;
    required orderDefine: default::nonNegative;
  }

  type SysDataObjFieldEmbedListConfig extending sys_core::SysObj {
    required actionFieldGroupModal: sys_core::SysDataObjActionFieldGroup {
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
    required actionFieldGroupModal: sys_core::SysDataObjActionFieldGroup {
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
    exprFilter: str;
    exprPropDisplay: str;
    exprSort: str;
    exprWith: str;
    table: sys_db::SysTable;
    constraint exclusive on (.name);
  }
 
  type SysDataObjTable extending sys_user::Mgmt {
    columnParent: sys_db::SysColumn;   
    required index: default::nonNegative;
    indexParent: default::nonNegative;
    required table: sys_db::SysTable;
  }

  type SysDataObjWith extending sys_user::Mgmt {
    required index: default::nonNegative;
    required expr: str;
  }
  
  type SysNodeObj extending sys_core::SysObj {
    required codeIcon: sys_core::SysCode;
    required codeNavType: sys_core::SysCode;
    required codeNodeType: sys_core::SysCode;
    dataObj: sys_core::SysDataObj {
      on target delete allow
    };
    required isAlwaysRetrieveData: bool;
    required isHideRowManager: bool;
    isSystemRoot: bool;
    parent: sys_core::SysNodeObj;
    page: str;
    constraint exclusive on (.name);
  }

  # FUNCTIONS
  function getApp(name: str) -> optional sys_core::SysApp
     using (select assert_single((select sys_core::SysApp filter .name = name)));

  function getCodeType(codeTypeName: str) -> optional sys_core::SysCodeType
    using (select sys_core::SysCodeType filter .name = codeTypeName);

  function getCode(codeTypeName: str,  codeName: str) -> optional sys_core::SysCode
    using (select assert_single(sys_core::SysCode filter 
      .codeType.name = codeTypeName and 
      .name = codeName));

  function getCodeSystem(sysName: str, codeTypeName: str,  codeName: str) -> optional sys_core::SysCode
    using (select assert_single(sys_core::SysCode filter 
      .owner.name = sysName and
      .codeType.name = codeTypeName and 
      .name = codeName));

  function getObj(name: str) -> optional sys_core::SysObj
    using (select assert_single((select sys_core::SysObj filter .name = name)));

  function getObjRoot(name: str) -> optional sys_core::ObjRoot
    using (select assert_single((select sys_core::ObjRoot filter .name = name)));
    
  function getOrg(name: str) -> optional sys_core::SysOrg
    using (select assert_single((select sys_core::SysOrg filter .name = name)));

  function getDataObj(dataObjName: str) -> optional sys_core::SysDataObj
    using (select sys_core::SysDataObj filter .name = dataObjName);        
    
  function getDataObjActionField(dataObjActionName: str) -> optional sys_core::SysDataObjActionField
    using (select sys_core::SysDataObjActionField filter .name = dataObjActionName);        
    
  function getDataObjActionFieldGroup(name: str) -> optional sys_core::SysDataObjActionFieldGroup
    using (select sys_core::SysDataObjActionFieldGroup filter .name = name);        
      
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
