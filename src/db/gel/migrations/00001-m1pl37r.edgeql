CREATE MIGRATION m1pl37rejsabftop2p4suhnlmslnfjezwtxpeuybwkbq4hbsry6hyq
    ONTO initial
{
  CREATE MODULE app_cm IF NOT EXISTS;
  CREATE MODULE app_crm IF NOT EXISTS;
  CREATE MODULE org_client_baltimore IF NOT EXISTS;
  CREATE MODULE sys_core IF NOT EXISTS;
  CREATE MODULE sys_db IF NOT EXISTS;
  CREATE MODULE sys_migr IF NOT EXISTS;
  CREATE MODULE sys_rep IF NOT EXISTS;
  CREATE MODULE sys_test IF NOT EXISTS;
  CREATE MODULE sys_user IF NOT EXISTS;
  CREATE SCALAR TYPE default::Name EXTENDING std::str;
  CREATE SCALAR TYPE default::nonNegative EXTENDING std::int64 {
      CREATE CONSTRAINT std::min_value(0);
  };
  CREATE TYPE sys_core::ObjRoot {
      CREATE PROPERTY isGlobalResource: std::bool {
          SET default := false;
      };
      CREATE PROPERTY note: std::str;
      CREATE PROPERTY testBool: std::bool;
      CREATE PROPERTY testDate: std::cal::local_date;
      CREATE PROPERTY testDateTime: std::cal::local_datetime;
      CREATE PROPERTY testNumberFloat: std::float64;
      CREATE PROPERTY testNumberInt: std::int64;
      CREATE PROPERTY testText: std::str;
  };
  CREATE TYPE sys_core::ObjRootCore EXTENDING sys_core::ObjRoot {
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY header: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE PROPERTY orderDefine: default::nonNegative;
  };
  CREATE ABSTRACT TYPE sys_user::Mgmt {
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_of_transaction());
          SET readonly := true;
      };
      CREATE PROPERTY modifiedAt: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_transaction());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_transaction());
      };
  };
  CREATE TYPE sys_core::SysObj EXTENDING sys_core::ObjRootCore, sys_user::Mgmt;
  CREATE TYPE app_cm::CmCourse EXTENDING sys_core::SysObj {
      CREATE PROPERTY courseCertifications: std::str;
      CREATE PROPERTY courseExams: std::str;
      CREATE PROPERTY courseItemsIncluded: std::str;
      CREATE PROPERTY courseItemsNotIncluded: std::str;
      CREATE PROPERTY courseRequirements: std::str;
      CREATE PROPERTY schedule: std::str;
  };
  CREATE FUNCTION app_cm::getCMTrainingCourse(name: std::str) -> OPTIONAL app_cm::CmCourse USING (SELECT
      std::assert_single((SELECT
          app_cm::CmCourse
      FILTER
          (.name = name)
      ))
  );
  CREATE TYPE sys_core::SysObjAttr EXTENDING sys_core::SysObj;
  CREATE TYPE sys_core::SysCode EXTENDING sys_core::SysObjAttr {
      CREATE LINK parent: sys_core::SysCode;
      CREATE PROPERTY order: default::nonNegative;
      CREATE PROPERTY valueDecimal: std::float64;
      CREATE PROPERTY valueInteger: std::int64;
      CREATE PROPERTY valueString: std::str;
  };
  ALTER TYPE sys_core::ObjRoot {
      CREATE MULTI LINK testCodeMulti: sys_core::SysCode;
      CREATE LINK testCodeSingle: sys_core::SysCode;
  };
  ALTER TYPE sys_core::ObjRootCore {
      CREATE LINK codeIcon: sys_core::SysCode;
  };
  CREATE TYPE sys_core::SysCodeType EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE LINK parent: sys_core::SysCodeType;
      CREATE PROPERTY order: default::nonNegative;
      CREATE PROPERTY valueDecimal: std::float64;
      CREATE PROPERTY valueInteger: std::int64;
      CREATE PROPERTY valueString: std::str;
  };
  ALTER TYPE sys_core::SysCode {
      CREATE REQUIRED LINK codeType: sys_core::SysCodeType;
  };
  CREATE FUNCTION sys_core::getCode(codeTypeName: std::str, codeName: std::str) -> OPTIONAL sys_core::SysCode USING (SELECT
      std::assert_single(sys_core::SysCode FILTER
          ((.codeType.name = codeTypeName) AND (.name = codeName))
      )
  );
  CREATE FUNCTION sys_core::getCodeAttrType(codeName: std::str) -> OPTIONAL sys_core::SysCode USING (SELECT
      std::assert_single(sys_core::SysCode FILTER
          ((.codeType.name = 'ct_sys_obj_attr_type') AND (.name = codeName))
      )
  );
  ALTER TYPE sys_core::SysObjAttr {
      CREATE REQUIRED LINK codeAttrType: sys_core::SysCode;
  };
  ALTER TYPE sys_core::SysCode {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_code'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
      CREATE MULTI LINK codeTypeFamily: sys_core::SysCodeType;
  };
  CREATE TYPE sys_core::SysCodeAction EXTENDING sys_core::SysCode {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_code_action'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  CREATE FUNCTION sys_core::getCodeAction(codeName: std::str) -> OPTIONAL sys_core::SysCodeAction USING (SELECT
      std::assert_single(sys_core::SysCodeAction FILTER
          (.name = codeName)
      )
  );
  CREATE TYPE sys_core::SysObjAttrEnt EXTENDING sys_core::SysObjAttr {
      CREATE LINK codeState: sys_core::SysCode;
      CREATE PROPERTY addr1: std::str;
      CREATE PROPERTY addr2: std::str;
      CREATE PROPERTY city: std::str;
      CREATE PROPERTY email: std::str;
      CREATE PROPERTY phoneOffice: std::str;
      CREATE PROPERTY website: std::str;
      CREATE PROPERTY zip: std::str;
  };
  CREATE TYPE app_cm::CmPartner EXTENDING sys_core::SysObjAttrEnt {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_cm_partner'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  CREATE TYPE app_cm::CmProgram EXTENDING sys_core::SysObjAttrEnt {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_cm_program'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  CREATE TYPE app_cm::CmSite EXTENDING sys_core::SysObjAttrEnt {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_cm_site'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  CREATE TYPE app_crm::CrmClient EXTENDING sys_core::SysObjAttrEnt {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_crm_client'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  CREATE TYPE sys_core::SysGridStyle {
      CREATE PROPERTY exprTrigger: std::str;
      CREATE REQUIRED PROPERTY prop: std::str;
      CREATE REQUIRED PROPERTY propValue: std::str;
  };
  CREATE TYPE sys_core::SysObjDb EXTENDING sys_core::SysObjAttrEnt {
      CREATE PROPERTY exprFilter: std::str;
      CREATE PROPERTY exprFilterExcept: std::str;
      CREATE PROPERTY exprSort: std::str;
      CREATE MULTI PROPERTY exprUnions: std::str;
      CREATE PROPERTY exprWith: std::str;
      CREATE PROPERTY listPresetExpr: std::str;
      CREATE PROPERTY parentFilterExpr: std::str;
  };
  CREATE TYPE sys_core::SysDataObj EXTENDING sys_core::SysObjDb {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_data_obj'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK codeCardinality: sys_core::SysCode;
      CREATE LINK codeDataObjType: sys_core::SysCode;
      CREATE LINK codeListPresetType: sys_core::SysCode;
      CREATE LINK processType: sys_core::SysCode;
      CREATE MULTI LINK gridStyles: sys_core::SysGridStyle {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE PROPERTY isFormReadonly: std::bool;
      CREATE PROPERTY isInitialValidationSilent: std::bool;
      CREATE REQUIRED PROPERTY isListEdit: std::bool;
      CREATE PROPERTY isListSuppressFilterSort: std::bool;
      CREATE PROPERTY isListSuppressSelect: std::bool;
      CREATE PROPERTY subHeader: std::str;
  };
  CREATE TYPE sys_core::SysDataObjActionGroup EXTENDING sys_core::SysObjAttrEnt {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_data_obj_action_group'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
      CREATE CONSTRAINT std::exclusive ON (.name);
  };
  CREATE TYPE sys_core::SysDataObjFieldEmbedListConfig EXTENDING sys_core::SysObjAttrEnt {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_data_obj_field_embed_list_config'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK dataObjEmbed: sys_core::SysDataObj {
          ON SOURCE DELETE ALLOW;
      };
      CREATE REQUIRED LINK dataObjModal: sys_core::SysDataObj {
          ON SOURCE DELETE ALLOW;
      };
      CREATE REQUIRED LINK actionGroupModal: sys_core::SysDataObjActionGroup {
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE TYPE sys_core::SysDataObjFieldEmbedListEdit EXTENDING sys_core::SysObjAttrEnt {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_data_obj_field_embed_list_edit'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK dataObjEmbed: sys_core::SysDataObj {
          ON SOURCE DELETE ALLOW;
      };
  };
  CREATE TYPE sys_core::SysDataObjFieldEmbedListSelect EXTENDING sys_core::SysObjAttrEnt {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_data_obj_field_embed_list_select'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK dataObjList: sys_core::SysDataObj {
          ON SOURCE DELETE ALLOW;
      };
      CREATE REQUIRED LINK actionGroupModal: sys_core::SysDataObjActionGroup {
          ON TARGET DELETE ALLOW;
      };
      CREATE REQUIRED PROPERTY btnLabelComplete: std::str;
  };
  CREATE TYPE sys_core::SysDataObjFieldListItemsProp {
      CREATE REQUIRED PROPERTY expr: std::str;
      CREATE REQUIRED PROPERTY header: std::str;
      CREATE REQUIRED PROPERTY isDisplayId: std::bool;
      CREATE REQUIRED PROPERTY key: std::str;
      CREATE REQUIRED PROPERTY orderDefine: default::nonNegative;
      CREATE PROPERTY orderSort: default::nonNegative;
  };
  CREATE TYPE sys_core::SysDataObjFieldListItems EXTENDING sys_core::SysObjDb {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_data_obj_field_list_item'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE LINK codeDataTypeDisplay: sys_core::SysCode;
      CREATE LINK codeMask: sys_core::SysCode;
      CREATE MULTI LINK props: sys_core::SysDataObjFieldListItemsProp {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE PROPERTY displayIdSeparator: std::str;
  };
  CREATE TYPE sys_core::SysEligibility EXTENDING sys_core::SysObjAttr {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_eligibility'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  CREATE TYPE sys_core::SysNodeObj EXTENDING sys_core::SysObjAttrEnt {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_node_obj'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK codeComponent: sys_core::SysCode;
      CREATE REQUIRED LINK codeNodeType: sys_core::SysCode;
      CREATE LINK codeQueryTypeAlt: sys_core::SysCode;
      CREATE LINK codeRenderPlatform: sys_core::SysCode;
      CREATE LINK dataObj: sys_core::SysDataObj;
      CREATE LINK selectListItems: sys_core::SysDataObjFieldListItems;
      CREATE REQUIRED PROPERTY isAlwaysRetrieveData: std::bool;
      CREATE REQUIRED PROPERTY isHideRowManager: std::bool;
      CREATE PROPERTY isRetrievePreset: std::bool;
      CREATE PROPERTY page: std::str;
      CREATE PROPERTY selectListItemsHeader: std::str;
      CREATE PROPERTY selectListItemsParmValue: std::str;
  };
  CREATE TYPE sys_db::SysColumn EXTENDING sys_core::SysObjAttrEnt {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_db_column'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK codeAlignment: sys_core::SysCode;
      CREATE REQUIRED LINK codeDataType: sys_core::SysCode;
      CREATE PROPERTY classProps: std::str;
      CREATE PROPERTY exprStorageKey: std::str;
      CREATE PROPERTY headerSide: std::str;
      CREATE PROPERTY inputMask: std::str;
      CREATE REQUIRED PROPERTY isExcludeInsert: std::bool;
      CREATE REQUIRED PROPERTY isExcludeSelect: std::bool;
      CREATE REQUIRED PROPERTY isExcludeUpdate: std::bool;
      CREATE PROPERTY isFormTag: std::bool;
      CREATE REQUIRED PROPERTY isMultiSelect: std::bool;
      CREATE REQUIRED PROPERTY isSelfReference: std::bool;
      CREATE PROPERTY matchColumn: std::str;
      CREATE PROPERTY maxLength: default::nonNegative;
      CREATE PROPERTY maxValue: std::float64;
      CREATE PROPERTY minLength: default::nonNegative;
      CREATE PROPERTY minValue: std::float64;
      CREATE PROPERTY pattern: std::str;
      CREATE PROPERTY patternMsg: std::str;
      CREATE PROPERTY patternReplacement: std::str;
      CREATE PROPERTY placeHolder: std::str;
      CREATE PROPERTY spinStep: std::str;
      CREATE PROPERTY toggleContinueRequiresTrue: std::bool;
      CREATE PROPERTY togglePresetTrue: std::bool;
      CREATE PROPERTY toggleValueFalse: std::str;
      CREATE PROPERTY toggleValueShow: std::bool;
      CREATE PROPERTY toggleValueTrue: std::str;
  };
  CREATE TYPE sys_db::SysTable EXTENDING sys_core::SysObjAttrEnt {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_db_table'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE MULTI LINK columns: sys_db::SysColumn {
          ON SOURCE DELETE ALLOW;
      };
      CREATE REQUIRED PROPERTY hasMgmt: std::bool;
      CREATE REQUIRED PROPERTY mod: std::str;
      CREATE PROPERTY table := (((.mod ++ '::') ++ .name));
  };
  CREATE TYPE sys_migr::SysMigr EXTENDING sys_core::SysObjAttr {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_migr_migration'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  CREATE TYPE sys_rep::SysAnalytic EXTENDING sys_core::SysObjAttr {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_rep_analytic'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  CREATE TYPE sys_rep::SysRep EXTENDING sys_core::SysObjAttr {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_rep_report'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
      CREATE REQUIRED LINK actionGroup: sys_core::SysDataObjActionGroup;
      CREATE MULTI LINK analytics: sys_rep::SysAnalytic;
      CREATE PROPERTY exprFilter: std::str;
      CREATE PROPERTY exprSort: std::str;
      CREATE PROPERTY exprWith: std::str;
  };
  CREATE TYPE sys_user::SysApp EXTENDING sys_core::SysObjAttr {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_app'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
      CREATE MULTI LINK nodes: sys_core::SysNodeObj {
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE TYPE sys_user::SysAppHeader EXTENDING sys_core::SysObjAttrEnt {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_app_header'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  CREATE TYPE sys_user::SysTask EXTENDING sys_core::SysObjAttr {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_user_task'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
      CREATE LINK codeTaskStatusObj: sys_core::SysCode;
      CREATE REQUIRED LINK codeTaskType: sys_core::SysCode;
      CREATE LINK nodeObj: sys_core::SysNodeObj;
      CREATE PROPERTY exprShow: std::str;
      CREATE PROPERTY exprStatus: std::str;
      CREATE PROPERTY exprWith: std::str;
      CREATE PROPERTY hasAltOpen: std::bool;
      CREATE PROPERTY noDataMsg: std::str;
  };
  CREATE TYPE sys_core::SysNavDestination {
      CREATE REQUIRED LINK codeDestinationType: sys_core::SysCode;
      CREATE LINK nodeDestination: sys_core::SysNodeObj {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE PROPERTY backCount: std::int16;
  };
  CREATE TYPE sys_user::SysUserAction EXTENDING sys_core::SysObjAttr {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_user_user_action'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
      CREATE REQUIRED LINK codeConfirmType: sys_core::SysCode;
      CREATE REQUIRED LINK codeAction: sys_core::SysCodeAction;
      CREATE LINK navDestination: sys_core::SysNavDestination {
          ON TARGET DELETE ALLOW;
      };
      CREATE PROPERTY exprAction: std::str;
      CREATE PROPERTY exprEnable: std::str;
      CREATE PROPERTY exprShow: std::str;
      CREATE PROPERTY exprShowExpr: std::str;
      CREATE PROPERTY exprWith: std::str;
  };
  CREATE TYPE sys_core::SysNodeObjConfig {
      CREATE REQUIRED LINK codeAttrType: sys_core::SysCode;
      CREATE REQUIRED LINK nodeObj: sys_core::SysNodeObj {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
  CREATE TYPE sys_core::SysSystem EXTENDING sys_core::ObjRootCore, sys_user::Mgmt {
      CREATE MULTI LINK typesCodeType: sys_core::SysCodeType;
      CREATE MULTI LINK nodesConfig: sys_core::SysNodeObjConfig {
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK systemParents: sys_core::SysSystem;
      CREATE REQUIRED PROPERTY appName: std::str;
      CREATE PROPERTY file: std::json;
      CREATE PROPERTY logoMarginRight: std::float64;
      CREATE PROPERTY logoWidth: std::int16;
  };
  ALTER TYPE sys_core::SysObj {
      CREATE REQUIRED LINK ownerSys: sys_core::SysSystem;
  };
  CREATE FUNCTION sys_core::getCodeSystem(sysName: std::str, codeTypeName: std::str, codeName: std::str) -> OPTIONAL sys_core::SysCode USING (SELECT
      std::assert_single(sys_core::SysCode FILTER
          (((.ownerSys.name = sysName) AND (.codeType.name = codeTypeName)) AND (.name = codeName))
      )
  );
  CREATE FUNCTION sys_core::getCodeType(codeTypeName: std::str) -> OPTIONAL sys_core::SysCodeType USING (SELECT
      sys_core::SysCodeType
  FILTER
      (.name = codeTypeName)
  );
  CREATE FUNCTION sys_core::getDataObj(dataObjName: std::str) -> OPTIONAL sys_core::SysDataObj USING (SELECT
      sys_core::SysDataObj
  FILTER
      (.name = dataObjName)
  );
  CREATE FUNCTION sys_core::getDataObjActionGroup(name: std::str) -> OPTIONAL sys_core::SysDataObjActionGroup USING (SELECT
      sys_core::SysDataObjActionGroup
  FILTER
      (.name = name)
  );
  CREATE TYPE sys_core::SysDataObjColumn EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK column: sys_db::SysColumn;
      CREATE PROPERTY nameCustom: std::str;
      CREATE LINK codeAccess: sys_core::SysCode;
      CREATE LINK codeAlignmentAlt: sys_core::SysCode;
      CREATE LINK codeColor: sys_core::SysCode;
      CREATE LINK codeDbDataSourceValue: sys_core::SysCode;
      CREATE LINK codeFieldElement: sys_core::SysCode;
      CREATE LINK codeSortDir: sys_core::SysCode;
      CREATE LINK customColCodeComponent: sys_core::SysCode;
      CREATE LINK action: sys_user::SysUserAction;
      CREATE LINK columnBacklink: sys_db::SysColumn;
      CREATE MULTI LINK customEmbedShellFields: sys_core::SysDataObjColumn {
          ON TARGET DELETE ALLOW;
      };
      CREATE LINK fieldEmbedListConfig: sys_core::SysDataObjFieldEmbedListConfig {
          ON TARGET DELETE ALLOW;
      };
      CREATE LINK fieldEmbedListEdit: sys_core::SysDataObjFieldEmbedListEdit {
          ON TARGET DELETE ALLOW;
      };
      CREATE LINK fieldEmbedListSelect: sys_core::SysDataObjFieldEmbedListSelect {
          ON TARGET DELETE ALLOW;
      };
      CREATE LINK fieldListItems: sys_core::SysDataObjFieldListItems;
      CREATE MULTI LINK gridStyles: sys_core::SysGridStyle {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE LINK linkTable: sys_db::SysTable;
      CREATE PROPERTY customColActionValue: std::str;
      CREATE PROPERTY customColAlign: std::str;
      CREATE PROPERTY customColFile: std::json;
      CREATE PROPERTY customColIsSubHeader: std::bool;
      CREATE PROPERTY customColLabel: std::str;
      CREATE PROPERTY customColPrefix: std::str;
      CREATE PROPERTY customColRawHTML: std::str;
      CREATE PROPERTY customColSize: std::str;
      CREATE PROPERTY customColSource: std::str;
      CREATE PROPERTY customColSourceKey: std::str;
      CREATE PROPERTY exprCustom: std::str;
      CREATE PROPERTY exprPreset: std::str;
      CREATE PROPERTY exprSave: std::str;
      CREATE PROPERTY fieldListItemsParmValue: std::str;
      CREATE MULTI PROPERTY fieldListItemsParmValueList: std::str;
      CREATE PROPERTY file: std::json;
      CREATE PROPERTY headerAlt: std::str;
      CREATE PROPERTY height: std::int16;
      CREATE PROPERTY indexTable: default::nonNegative;
      CREATE PROPERTY inputMaskAlt: std::str;
      CREATE PROPERTY isDisplay: std::bool;
      CREATE PROPERTY isDisplayBlock: std::bool;
      CREATE PROPERTY isDisplayable: std::bool;
      CREATE REQUIRED PROPERTY isExcludeInsert: std::bool;
      CREATE REQUIRED PROPERTY isExcludeSelect: std::bool;
      CREATE REQUIRED PROPERTY isExcludeUpdate: std::bool;
      CREATE PROPERTY orderCrumb: default::nonNegative;
      CREATE REQUIRED PROPERTY orderDefine: default::nonNegative;
      CREATE PROPERTY orderDisplay: default::nonNegative;
      CREATE PROPERTY orderSort: default::nonNegative;
      CREATE PROPERTY propNameKeyPrefix: std::str;
      CREATE PROPERTY propNameKeySuffix: std::str;
      CREATE PROPERTY width: std::int16;
  };
  ALTER TYPE sys_core::SysDataObj {
      CREATE MULTI LINK columns: sys_core::SysDataObjColumn {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE FUNCTION sys_core::getDataObjColumn(dataObjName: std::str, columnName: std::str) -> OPTIONAL sys_core::SysDataObjColumn USING (SELECT
      std::assert_single((SELECT
          sys_core::SysDataObjColumn
      FILTER
          ((.id IN ((SELECT
              sys_core::SysDataObj
          FILTER
              (.name = dataObjName)
          )).columns.id) AND std::any(((.column.name = columnName) UNION (.nameCustom = columnName))))
      ))
  );
  CREATE FUNCTION sys_core::getDataObjFieldEmbedListConfig(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldEmbedListConfig USING (SELECT
      sys_core::SysDataObjFieldEmbedListConfig
  FILTER
      (.name = name)
  );
  CREATE FUNCTION sys_core::getDataObjFieldEmbedListEdit(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldEmbedListEdit USING (SELECT
      sys_core::SysDataObjFieldEmbedListEdit
  FILTER
      (.name = name)
  );
  CREATE FUNCTION sys_core::getDataObjFieldEmbedListSelect(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldEmbedListSelect USING (SELECT
      sys_core::SysDataObjFieldEmbedListSelect
  FILTER
      (.name = name)
  );
  CREATE FUNCTION sys_core::getDataObjFieldListItems(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldListItems USING (SELECT
      sys_core::SysDataObjFieldListItems
  FILTER
      (.name = name)
  );
  CREATE FUNCTION sys_core::getEligibility(name: std::str) -> OPTIONAL sys_core::SysEligibility USING (SELECT
      std::assert_single((SELECT
          sys_core::SysEligibility
      FILTER
          (.name = name)
      ))
  );
  CREATE TYPE sys_core::SysEligibilityNode EXTENDING sys_core::ObjRootCore {
      CREATE REQUIRED LINK codeEligibilityType: sys_core::SysCode;
      CREATE PROPERTY exprState: std::str;
      CREATE REQUIRED PROPERTY nodeIdx: default::nonNegative;
      CREATE PROPERTY nodeIdxDependent: default::nonNegative;
      CREATE PROPERTY nodeIdxParent: default::nonNegative;
      CREATE PROPERTY order: default::nonNegative;
  };
  CREATE FUNCTION sys_core::getEligibilityNode(id: std::str) -> OPTIONAL sys_core::SysEligibilityNode USING (SELECT
      std::assert_single((SELECT
          sys_core::SysEligibilityNode
      FILTER
          (.id = <std::uuid>id)
      ))
  );
  CREATE FUNCTION sys_core::getNodeObjById(nodeObjId: std::str) -> OPTIONAL sys_core::SysNodeObj USING (SELECT
      sys_core::SysNodeObj
  FILTER
      (.id = <std::uuid>nodeObjId)
  );
  CREATE FUNCTION sys_core::getNodeObjByName(nodeObjName: std::str) -> OPTIONAL sys_core::SysNodeObj USING (SELECT
      sys_core::SysNodeObj
  FILTER
      (.name = nodeObjName)
  );
  CREATE FUNCTION sys_core::getObj(ownerName: std::str, name: std::str) -> OPTIONAL sys_core::SysObj USING (SELECT
      std::assert_single((SELECT
          sys_core::SysObj
      FILTER
          ((.ownerSys.name = ownerName) AND (.name = name))
      ))
  );
  CREATE FUNCTION sys_core::getObjAttr(codeAttrTypeName: std::str, name: std::str) -> OPTIONAL sys_core::SysObjAttr USING (SELECT
      std::assert_single((SELECT
          sys_core::SysObjAttr
      FILTER
          ((.codeAttrType.name = codeAttrTypeName) AND (.name = name))
      ))
  );
  CREATE FUNCTION sys_core::getObjRootCore(name: std::str) -> OPTIONAL sys_core::ObjRootCore USING (SELECT
      std::assert_single((SELECT
          sys_core::ObjRootCore
      FILTER
          (.name = name)
      ))
  );
  CREATE TYPE sys_core::SysOrg EXTENDING sys_core::ObjRootCore, sys_user::Mgmt {
      CREATE CONSTRAINT std::exclusive ON (.name);
  };
  CREATE FUNCTION sys_core::getOrg(name: std::str) -> OPTIONAL sys_core::SysOrg USING (SELECT
      std::assert_single((SELECT
          sys_core::SysOrg
      FILTER
          (.name = name)
      ))
  );
  ALTER TYPE sys_core::SysSystem {
      CREATE REQUIRED LINK ownerOrg: sys_core::SysOrg;
  };
  CREATE FUNCTION sys_core::getSystem(nameOwner: std::str, nameSystem: std::str) -> OPTIONAL sys_core::SysSystem USING (SELECT
      std::assert_single((SELECT
          sys_core::SysSystem
      FILTER
          ((.ownerOrg.name = nameOwner) AND (.name = nameSystem))
      ))
  );
  CREATE FUNCTION sys_core::getSystemPrime(nameSystem: std::str) -> OPTIONAL sys_core::SysSystem USING (SELECT
      std::assert_single((SELECT
          sys_core::SysSystem
      FILTER
          (.name = nameSystem)
      ))
  );
  CREATE FUNCTION sys_db::getColumn(columnName: std::str) -> OPTIONAL sys_db::SysColumn USING (SELECT
      sys_db::SysColumn
  FILTER
      (.name = columnName)
  );
  CREATE FUNCTION sys_db::getTable(tableName: std::str) -> OPTIONAL sys_db::SysTable USING (SELECT
      sys_db::SysTable
  FILTER
      (.name = tableName)
  );
  CREATE FUNCTION sys_rep::getReport(name: std::str) -> OPTIONAL sys_rep::SysRep USING (SELECT
      std::assert_single((SELECT
          sys_rep::SysRep
      FILTER
          (.name = name)
      ))
  );
  CREATE FUNCTION sys_user::getApp(name: std::str) -> OPTIONAL sys_user::SysApp USING (SELECT
      std::assert_single((SELECT
          sys_user::SysApp
      FILTER
          (.name = name)
      ))
  );
  CREATE TYPE sys_core::SysObjOrg EXTENDING sys_core::ObjRootCore, sys_user::Mgmt {
      CREATE REQUIRED LINK ownerOrg: sys_core::SysOrg;
      CREATE CONSTRAINT std::exclusive ON ((.ownerOrg, .name));
  };
  CREATE TYPE sys_user::SysUser EXTENDING sys_core::SysObjOrg {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK systemDefault: sys_core::SysSystem;
      CREATE REQUIRED MULTI LINK systems: sys_core::SysSystem;
      CREATE PROPERTY isActive: std::bool;
      CREATE REQUIRED PROPERTY password: std::str {
          SET default := (SELECT
              <std::str>std::uuid_generate_v4()
          );
      };
  };
  CREATE FUNCTION sys_user::getRootUser() -> OPTIONAL sys_user::SysUser USING (SELECT
      std::assert_single((SELECT
          sys_user::SysUser
      FILTER
          (.name = '*ROOTUSER*')
      ))
  );
  CREATE FUNCTION sys_user::getUserAction(name: std::str) -> OPTIONAL sys_user::SysUserAction USING (SELECT
      std::assert_single((SELECT
          sys_user::SysUserAction
      FILTER
          (.name = name)
      ))
  );
  CREATE FUNCTION sys_user::getUserById(userId: std::str) -> OPTIONAL sys_user::SysUser USING (SELECT
      sys_user::SysUser
  FILTER
      (.id = <std::uuid>userId)
  );
  CREATE FUNCTION sys_user::getUserByName(name: std::str) -> OPTIONAL sys_user::SysUser USING (SELECT
      std::assert_single((SELECT
          sys_user::SysUser
      FILTER
          (.name = name)
      ))
  );
  ALTER TYPE sys_user::Mgmt {
      CREATE REQUIRED LINK createdBy: sys_user::SysUser {
          ON TARGET DELETE DELETE SOURCE;
          SET readonly := true;
      };
      CREATE REQUIRED LINK modifiedBy: sys_user::SysUser {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
  CREATE TYPE sys_core::SysObjAttrAccess EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeAttrTypeAccess: sys_core::SysCode;
      CREATE REQUIRED LINK obj: sys_core::SysObjAttr;
  };
  ALTER TYPE sys_core::ObjRoot {
      CREATE MULTI LINK attrsAccess: sys_core::SysObjAttrAccess {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE TYPE sys_core::SysObjAttrAction EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeAttrTypeAction: sys_core::SysCode;
      CREATE REQUIRED LINK obj: sys_core::SysObjAttr;
  };
  ALTER TYPE sys_core::ObjRoot {
      CREATE MULTI LINK attrsAction: sys_core::SysObjAttrAction {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE TYPE sys_core::SysObjAttrExpr EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeAttrTypeAction: sys_core::SysCode;
      CREATE REQUIRED PROPERTY expr: std::str;
  };
  CREATE TYPE sys_core::SysObjAttrVirtual EXTENDING sys_user::Mgmt {
      CREATE MULTI LINK attrsAccess: sys_core::SysObjAttrAccess {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK attrsAction: sys_core::SysObjAttrAction {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE REQUIRED PROPERTY expr: std::str;
  };
  CREATE TYPE sys_user::SysUserType EXTENDING sys_core::SysObjOrg {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE MULTI LINK attrsExpr: sys_core::SysObjAttrExpr {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK attrsVirtual: sys_core::SysObjAttrVirtual {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE LINK selfSignupSystem: sys_core::SysSystem;
      CREATE PROPERTY isSelfSignup: std::bool;
  };
  CREATE FUNCTION sys_user::getUserType(userTypeName: std::str) -> OPTIONAL sys_user::SysUserType USING (SELECT
      sys_user::SysUserType
  FILTER
      (.name = userTypeName)
  );
  CREATE GLOBAL sys_user::currentUserId -> std::uuid;
  CREATE TYPE sys_user::SysUserParm {
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE REQUIRED LINK user: sys_user::SysUser {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY idFeature: std::int64;
      CREATE CONSTRAINT std::exclusive ON ((.user, .idFeature, .codeType));
      CREATE REQUIRED PROPERTY parmData: std::json;
  };
  ALTER TYPE sys_user::SysUser {
      CREATE MULTI LINK parms: sys_user::SysUserParm {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE TYPE sys_user::SysUserPref EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE REQUIRED LINK user: sys_user::SysUser {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE CONSTRAINT std::exclusive ON ((.user, .codeType));
      CREATE REQUIRED PROPERTY isActive: std::bool;
  };
  ALTER TYPE sys_user::SysUser {
      CREATE MULTI LINK preferences: sys_user::SysUserPref {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK userTypes: sys_user::SysUserType {
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE GLOBAL sys_user::currentUser := (SELECT
      sys_user::SysUser
  FILTER
      (.id = GLOBAL sys_user::currentUserId)
  );
  CREATE TYPE app_cm::CmClient EXTENDING sys_user::Mgmt {
      CREATE LINK codeHighestEducation: sys_core::SysCode;
      CREATE REQUIRED LINK ownerSys: sys_core::SysSystem;
      CREATE PROPERTY agencyId: std::str;
      CREATE PROPERTY hasDriversLicense: std::str;
      CREATE PROPERTY school: std::str;
  };
  CREATE TYPE org_client_baltimore::MoedParticipant EXTENDING app_cm::CmClient {
      CREATE PROPERTY consentDisclaimer: std::bool;
      CREATE PROPERTY idxDemo: std::int64;
  };
  CREATE TYPE default::SysPerson EXTENDING sys_core::ObjRoot {
      CREATE LINK codeDisabilityStatus: sys_core::SysCode;
      CREATE LINK codeEthnicity: sys_core::SysCode;
      CREATE LINK codeGender: sys_core::SysCode;
      CREATE LINK codePersonLivingArrangements: sys_core::SysCode;
      CREATE LINK codeRace: sys_core::SysCode;
      CREATE LINK codeState: sys_core::SysCode;
      CREATE PROPERTY addr1: std::str;
      CREATE PROPERTY addr2: std::str;
      CREATE PROPERTY avatar: std::json;
      CREATE PROPERTY birthDate: std::cal::local_date;
      CREATE PROPERTY city: std::str;
      CREATE PROPERTY email: std::str;
      CREATE PROPERTY favFood: std::str;
      CREATE REQUIRED PROPERTY firstName: default::Name;
      CREATE REQUIRED PROPERTY lastName: default::Name;
      CREATE PROPERTY fullName := (((.firstName ++ ' ') ++ .lastName));
      CREATE PROPERTY genderSelfId: std::str;
      CREATE PROPERTY idMigration: std::uuid;
      CREATE PROPERTY isLegalAgreed: std::bool;
      CREATE PROPERTY middleName: default::Name;
      CREATE PROPERTY phoneAlt: std::str;
      CREATE PROPERTY phoneMobile: std::str;
      CREATE PROPERTY ssn: std::str;
      CREATE PROPERTY title: std::str;
      CREATE PROPERTY zip: std::str;
  };
  ALTER TYPE app_cm::CmClient {
      CREATE REQUIRED LINK person: default::SysPerson {
          ON SOURCE DELETE ALLOW;
      };
  };
  ALTER TYPE sys_core::SysObjAttrEnt {
      CREATE MULTI LINK contacts: default::SysPerson {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_user::SysUser {
      CREATE REQUIRED LINK person: default::SysPerson {
          ON SOURCE DELETE ALLOW;
      };
      CREATE TRIGGER sys_user_delete
          AFTER DELETE 
          FOR EACH DO (DELETE
              default::SysPerson
          FILTER
              (.id NOT IN ((app_cm::CmClient.person.id UNION sys_core::SysObjAttrEnt.contacts.id) UNION sys_user::SysUser.person.id))
          );
  };
  ALTER TYPE app_cm::CmClient {
      CREATE TRIGGER cm_client_delete
          AFTER DELETE 
          FOR EACH DO (DELETE
              default::SysPerson
          FILTER
              (.id NOT IN ((app_cm::CmClient.person.id UNION sys_core::SysObjAttrEnt.contacts.id) UNION sys_user::SysUser.person.id))
          );
  };
  ALTER TYPE sys_core::SysObjAttrEnt {
      CREATE TRIGGER sys_user_delete
          AFTER DELETE 
          FOR EACH DO (DELETE
              default::SysPerson
          FILTER
              (.id NOT IN ((app_cm::CmClient.person.id UNION sys_core::SysObjAttrEnt.contacts.id) UNION sys_user::SysUser.person.id))
          );
      CREATE CONSTRAINT std::exclusive ON ((.ownerSys, .name));
  };
  CREATE TYPE app_cm::CmClientServiceFlow EXTENDING sys_core::ObjRoot, sys_user::Mgmt {
      CREATE REQUIRED LINK client: app_cm::CmClient;
      CREATE REQUIRED LINK cmProgram: app_cm::CmProgram;
      CREATE REQUIRED LINK cmSite: app_cm::CmSite;
      CREATE LINK codeSfEligibilityStatus: sys_core::SysCode;
      CREATE LINK codeSfEnrollType: sys_core::SysCode;
      CREATE LINK codeSfOutcome: sys_core::SysCode;
      CREATE LINK user: sys_user::SysUser;
      CREATE REQUIRED PROPERTY dateCreated: std::cal::local_date;
      CREATE PROPERTY dateEnd: std::cal::local_date;
      CREATE PROPERTY dateEndEst: std::cal::local_date;
      CREATE PROPERTY dateStart: std::cal::local_date;
      CREATE PROPERTY dateStartEst: std::cal::local_date;
      CREATE PROPERTY idxDemo: std::int64;
  };
  CREATE TYPE app_cm::CmCsfData EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK csf: app_cm::CmClientServiceFlow;
  };
  CREATE TYPE app_cm::CmCsfCohort EXTENDING app_cm::CmCsfData {
      CREATE REQUIRED LINK codeStatus: sys_core::SysCode;
      CREATE PROPERTY note: std::str;
  };
  CREATE TYPE app_cm::CmCsfJobPlacement EXTENDING app_cm::CmCsfData {
      CREATE REQUIRED LINK codeJobType: sys_core::SysCode;
      CREATE REQUIRED LINK codePlacementRelated: sys_core::SysCode;
      CREATE LINK codeRetention: sys_core::SysCode;
      CREATE REQUIRED LINK codeWageType: sys_core::SysCode;
      CREATE REQUIRED PROPERTY dateStart: std::cal::local_date;
      CREATE PROPERTY employerContactEmail: std::str;
      CREATE PROPERTY employerContactNameFirst: std::str;
      CREATE PROPERTY employerContactNameLast: std::str;
      CREATE PROPERTY employerContactPhone: std::str;
      CREATE REQUIRED PROPERTY employerName: std::str;
      CREATE REQUIRED PROPERTY hoursPerWeek: std::float32;
      CREATE PROPERTY note: std::str;
      CREATE REQUIRED PROPERTY title: std::str;
      CREATE PROPERTY wage: std::float32;
  };
  CREATE TYPE app_cm::CmCsfDocument EXTENDING app_cm::CmCsfData {
      CREATE MULTI LINK cmEligibilityCategories: sys_core::SysCodeType;
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE PROPERTY dateExpires: std::cal::local_date;
      CREATE REQUIRED PROPERTY dateIssued: std::cal::local_date;
      CREATE PROPERTY file: std::json;
      CREATE PROPERTY isShareWithClient: std::bool;
      CREATE PROPERTY note: std::str;
  };
  CREATE TYPE app_cm::CmGroup EXTENDING sys_core::SysObj {
      CREATE REQUIRED LINK codeGroupEnrollment: sys_core::SysCode;
      CREATE REQUIRED LINK codeGroupType: sys_core::SysCode;
      CREATE LINK userGroupMgr: sys_user::SysUser;
      CREATE PROPERTY dateEnd: std::cal::local_date;
      CREATE REQUIRED PROPERTY dateStart: std::cal::local_date;
      CREATE REQUIRED PROPERTY isActive: std::bool;
  };
  CREATE TYPE app_cm::CmCsfGroup EXTENDING app_cm::CmCsfData {
      CREATE REQUIRED LINK cmGroup: app_cm::CmGroup;
  };
  CREATE TYPE app_cm::CmCsfEligibility EXTENDING app_cm::CmCsfData {
      CREATE REQUIRED PROPERTY eligibilityData: std::json;
      CREATE REQUIRED PROPERTY valueBoolean: std::bool;
  };
  CREATE TYPE app_cm::CmCsfNote EXTENDING app_cm::CmCsfData {
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE REQUIRED PROPERTY date: std::cal::local_date;
      CREATE PROPERTY note: std::str;
  };
  CREATE TYPE app_cm::CmCsfSchoolPlacement EXTENDING app_cm::CmCsfData {
      CREATE REQUIRED LINK codeCollegeStatus: sys_core::SysCode;
      CREATE PROPERTY collegeGPA: std::str;
      CREATE PROPERTY collegeGradYear: std::int16;
      CREATE PROPERTY collegeMajor: std::str;
      CREATE PROPERTY collegeName: std::str;
      CREATE REQUIRED PROPERTY date: std::cal::local_date;
      CREATE PROPERTY note: std::str;
  };
  CREATE TYPE app_cm::CmCohort EXTENDING sys_core::SysObj {
      CREATE LINK codeStatus: sys_core::SysCode;
      CREATE LINK staffInstructor: sys_user::SysUser;
      CREATE PROPERTY capacity: std::int16;
      CREATE PROPERTY cost: std::float32;
      CREATE PROPERTY dateEnd: std::cal::local_date;
      CREATE PROPERTY dateStart: std::cal::local_date;
      CREATE PROPERTY isCohortRequired: std::str;
      CREATE PROPERTY schedule: std::str;
  };
  CREATE TYPE app_cm::CmCohortAttd EXTENDING sys_user::Mgmt {
      CREATE REQUIRED PROPERTY date: std::cal::local_date;
      CREATE PROPERTY file: std::json;
      CREATE REQUIRED PROPERTY hours: std::float32;
      CREATE PROPERTY note: std::str;
  };
  ALTER TYPE app_cm::CmCohort {
      CREATE MULTI LINK cohortAttds: app_cm::CmCohortAttd {
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE app_cm::CmCohortAttd {
      CREATE PROPERTY cohortId := (std::assert_single(.<cohortAttds[IS app_cm::CmCohort].id));
  };
  ALTER TYPE app_cm::CmCourse {
      CREATE MULTI LINK cohorts: app_cm::CmCohort {
          ON TARGET DELETE ALLOW;
      };
      CREATE LINK codeSector: sys_core::SysCode;
      CREATE LINK codeStatus: sys_core::SysCode;
      CREATE LINK codeTypePayment: sys_core::SysCodeType;
  };
  ALTER TYPE app_cm::CmCohort {
      CREATE LINK course := (std::assert_single(.<cohorts[IS app_cm::CmCourse]));
  };
  CREATE TYPE app_cm::CmCohortDoc EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK cohort: app_cm::CmCohort;
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE REQUIRED PROPERTY date: std::cal::local_date;
      CREATE PROPERTY file: std::json;
      CREATE PROPERTY note: std::str;
  };
  ALTER TYPE app_cm::CmCsfCohort {
      CREATE REQUIRED LINK cohort: app_cm::CmCohort;
  };
  CREATE TYPE app_cm::CmCsfCohortAttd EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeCmCohortAttdDuration: sys_core::SysCode;
      CREATE REQUIRED LINK cohortAttd: app_cm::CmCohortAttd;
      CREATE PROPERTY computedHours := (SELECT
          (.codeCmCohortAttdDuration.valueDecimal * .cohortAttd.hours)
      );
      CREATE REQUIRED LINK csfCohort: app_cm::CmCsfCohort;
      CREATE PROPERTY note: std::str;
  };
  CREATE TYPE sys_core::SysObjNote EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE REQUIRED PROPERTY date: std::cal::local_date;
      CREATE PROPERTY note: std::str;
  };
  ALTER TYPE sys_core::SysObjAttrEnt {
      CREATE MULTI LINK notes: sys_core::SysObjNote {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE app_cm::CmProgram {
      CREATE LINK sysEligibility: sys_core::SysEligibility {
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE TYPE default::SysError {
      CREATE LINK user: sys_user::SysUser {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_of_transaction());
          SET readonly := true;
      };
      CREATE PROPERTY errCode: std::str;
      CREATE REQUIRED PROPERTY errFile: std::str;
      CREATE REQUIRED PROPERTY errFunction: std::str;
      CREATE REQUIRED PROPERTY errMsgSystem: std::str;
      CREATE REQUIRED PROPERTY errMsgUser: std::str;
      CREATE PROPERTY errStatus: std::int16;
      CREATE REQUIRED PROPERTY isClosed: std::bool {
          SET default := false;
      };
      CREATE PROPERTY note: std::str;
  };
  CREATE TYPE org_client_baltimore::MoedPartData EXTENDING sys_core::SysObj {
      CREATE LINK participant: org_client_baltimore::MoedParticipant;
  };
  CREATE TYPE sys_core::SysNotify EXTENDING sys_core::SysObj {
      CREATE REQUIRED LINK codeNotifyType: sys_core::SysCode;
      CREATE REQUIRED PROPERTY exprCron: std::str;
      CREATE PROPERTY exprData: std::str;
      CREATE REQUIRED PROPERTY exprTrigger: std::str;
      CREATE PROPERTY msg: std::str;
  };
  CREATE TYPE sys_core::SysMsg EXTENDING sys_core::ObjRoot {
      CREATE MULTI LINK recipients: sys_core::ObjRoot;
      CREATE LINK parent: sys_core::SysMsg;
      CREATE LINK replies := (.<parent[IS sys_core::SysMsg]);
      CREATE LINK thread := (DISTINCT ((.replies UNION sys_core::SysMsg)));
      CREATE MULTI LINK readers: sys_user::SysUser;
      CREATE REQUIRED LINK sender: sys_user::SysUser;
      CREATE REQUIRED PROPERTY dateMsg: std::datetime {
          SET default := (std::datetime_of_transaction());
          SET readonly := true;
      };
      CREATE REQUIRED PROPERTY isClosed: std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY isForward: std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY subject: std::str;
  };
  ALTER TYPE sys_core::SysCode {
      CREATE CONSTRAINT std::exclusive ON ((.ownerSys, .codeType, .name));
  };
  ALTER TYPE sys_core::SysCodeAction {
      ALTER CONSTRAINT std::exclusive ON ((.ownerSys, .codeType, .name)) {
          SET OWNED;
      };
  };
  ALTER TYPE sys_core::SysObjDb {
      CREATE LINK parentColumn: sys_db::SysColumn;
      CREATE LINK parentTable: sys_db::SysTable;
  };
  ALTER TYPE sys_core::SysDataObj {
      CREATE LINK actionGroup: sys_core::SysDataObjActionGroup;
      CREATE LINK listReorderColumn: sys_db::SysColumn;
  };
  ALTER TYPE sys_core::SysEligibility {
      CREATE MULTI LINK nodes: sys_core::SysEligibilityNode {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_core::SysOrg {
      CREATE LINK users := (.<ownerOrg[IS sys_user::SysUser]);
  };
  ALTER TYPE sys_core::SysSystem {
      CREATE CONSTRAINT std::exclusive ON ((.ownerOrg, .name));
      CREATE LINK users := (.<systems[IS sys_user::SysUser]);
  };
  ALTER TYPE sys_user::SysApp {
      CREATE CONSTRAINT std::exclusive ON ((.ownerSys, .name));
      CREATE REQUIRED LINK appHeader: sys_user::SysAppHeader;
  };
  ALTER TYPE sys_user::SysTask {
      CREATE CONSTRAINT std::exclusive ON ((.ownerSys, .name));
  };
  ALTER TYPE sys_user::SysUserAction {
      CREATE CONSTRAINT std::exclusive ON ((.ownerSys, .name));
  };
  CREATE TYPE sys_core::SysDataObjColumnItemChange EXTENDING sys_user::Mgmt {
      CREATE LINK codeAccess: sys_core::SysCode;
      CREATE REQUIRED LINK codeItemChangeAction: sys_core::SysCode;
      CREATE LINK codeItemChangeRecordStatus: sys_core::SysCode;
      CREATE REQUIRED LINK codeItemChangeTriggerType: sys_core::SysCode;
      CREATE LINK codeItemChangeValueType: sys_core::SysCode;
      CREATE LINK codeOp: sys_core::SysCode;
      CREATE LINK valueTargetCode: sys_core::SysCode;
      CREATE MULTI LINK valueTriggerCodes: sys_core::SysCode;
      CREATE MULTI LINK columns: sys_core::SysDataObjColumn;
      CREATE LINK valueTargetAttribute: sys_core::SysObjAttr;
      CREATE MULTI LINK valueTriggerAttributes: sys_core::SysObjAttr;
      CREATE REQUIRED PROPERTY orderDefine: default::nonNegative;
      CREATE PROPERTY retrieveParmKey: std::str;
      CREATE PROPERTY valueTargetScalar: std::str;
      CREATE PROPERTY valueTriggerScalar: std::str;
  };
  CREATE TYPE sys_core::SysDataObjAction EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeColor: sys_core::SysCode;
      CREATE REQUIRED LINK action: sys_user::SysUserAction;
      CREATE PROPERTY headerAlt: std::str;
      CREATE REQUIRED PROPERTY isListRowAction: std::bool;
      CREATE REQUIRED PROPERTY orderDefine: default::nonNegative;
  };
  CREATE TYPE sys_core::SysDataObjQueryRider EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeQueryAction: sys_core::SysCode;
      CREATE LINK codeQueryFunction: sys_core::SysCode;
      CREATE REQUIRED LINK codeQueryPlatform: sys_core::SysCode;
      CREATE REQUIRED LINK codeQueryType: sys_core::SysCode;
      CREATE REQUIRED LINK codeTriggerTiming: sys_core::SysCode;
      CREATE LINK codeUserMsgDelivery: sys_core::SysCode;
      CREATE LINK navDestination: sys_core::SysNavDestination {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE PROPERTY expr: std::str;
      CREATE PROPERTY parmValueStr: std::str;
      CREATE PROPERTY userMsg: std::str;
  };
  CREATE TYPE sys_migr::SysMigrSourceColumn EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeDataType: sys_core::SysCode;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE sys_migr::SysMigrSourceTable EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeMigrSourceType: sys_core::SysCode;
      CREATE MULTI LINK columns: sys_migr::SysMigrSourceColumn {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE PROPERTY exprSelect: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE sys_core::SysDataObjColumnLink EXTENDING sys_user::Mgmt {
      CREATE LINK column: sys_db::SysColumn;
      CREATE REQUIRED PROPERTY orderDefine: default::nonNegative;
  };
  CREATE TYPE sys_rep::SysRepEl EXTENDING sys_user::Mgmt {
      CREATE LINK codeAlignment: sys_core::SysCode;
      CREATE LINK codeDataType: sys_core::SysCode;
      CREATE LINK codeDbDataSourceValue: sys_core::SysCode;
      CREATE LINK codeFieldElement: sys_core::SysCode;
      CREATE REQUIRED LINK codeReportElementType: sys_core::SysCode;
      CREATE LINK codeSortDir: sys_core::SysCode;
      CREATE MULTI LINK linkColumns: sys_core::SysDataObjColumnLink {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE LINK column: sys_db::SysColumn;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY exprCustom: std::str;
      CREATE PROPERTY header: std::str;
      CREATE PROPERTY indexTable: default::nonNegative;
      CREATE PROPERTY isDisplay: std::bool;
      CREATE PROPERTY isDisplayable: std::bool;
      CREATE PROPERTY nameCustom: std::str;
      CREATE REQUIRED PROPERTY orderDefine: default::nonNegative;
      CREATE PROPERTY orderDisplay: default::nonNegative;
      CREATE PROPERTY orderSort: default::nonNegative;
  };
  CREATE TYPE sys_rep::SysRepParm EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeDataType: sys_core::SysCode;
      CREATE REQUIRED LINK codeFieldElement: sys_core::SysCode;
      CREATE LINK fieldListItems: sys_core::SysDataObjFieldListItems;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY exprFilter: std::str;
      CREATE PROPERTY fieldListItemsParmValue: std::str;
      CREATE REQUIRED PROPERTY header: std::str;
      CREATE REQUIRED PROPERTY isMultiSelect: std::bool;
      CREATE REQUIRED PROPERTY isRequired: std::bool;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY orderDefine: default::nonNegative;
  };
  CREATE TYPE sys_rep::SysAnalyticStatus EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeStatus: sys_core::SysCode;
      CREATE PROPERTY comment: std::str;
      CREATE PROPERTY expr: std::str;
  };
  CREATE TYPE sys_user::SysUserActionConfirm EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeConfirmType: sys_core::SysCode;
      CREATE REQUIRED LINK codeTriggerConfirmConditional: sys_core::SysCode;
      CREATE PROPERTY confirmButtonLabelCancel: std::str;
      CREATE PROPERTY confirmButtonLabelConfirm: std::str;
      CREATE PROPERTY confirmMessage: std::str;
      CREATE PROPERTY confirmTitle: std::str;
  };
  CREATE TYPE sys_core::SysNodeObjAction {
      CREATE REQUIRED LINK codeAction: sys_core::SysCodeAction;
      CREATE REQUIRED LINK nodeObj: sys_core::SysNodeObj {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
  ALTER TYPE sys_core::SysObjDb {
      CREATE MULTI LINK queryRiders: sys_core::SysDataObjQueryRider {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE LINK table: sys_db::SysTable;
  };
  CREATE TYPE sys_core::SysDataObjTable EXTENDING sys_user::Mgmt {
      CREATE LINK columnParent: sys_db::SysColumn;
      CREATE MULTI LINK columnsId: sys_db::SysColumn {
          ON TARGET DELETE ALLOW;
      };
      CREATE REQUIRED LINK table: sys_db::SysTable;
      CREATE PROPERTY exprFilterUpdate: std::str;
      CREATE REQUIRED PROPERTY index: default::nonNegative;
      CREATE PROPERTY indexParent: default::nonNegative;
      CREATE PROPERTY isTableExtension: std::bool;
  };
  ALTER TYPE sys_core::SysObjDb {
      CREATE MULTI LINK tables: sys_core::SysDataObjTable {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_core::SysDataObjActionGroup {
      CREATE MULTI LINK dataObjActions: sys_core::SysDataObjAction {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE MULTI LINK itemChanges: sys_core::SysDataObjColumnItemChange {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK linkColumns: sys_core::SysDataObjColumnLink {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_rep::SysRep {
      CREATE MULTI LINK tables: sys_core::SysDataObjTable {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE CONSTRAINT std::exclusive ON ((.ownerSys, .name));
      CREATE MULTI LINK elements: sys_rep::SysRepEl {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK parms: sys_rep::SysRepParm {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE TYPE sys_core::SysDataObjWith EXTENDING sys_user::Mgmt {
      CREATE REQUIRED PROPERTY expr: std::str;
      CREATE REQUIRED PROPERTY index: default::nonNegative;
  };
  ALTER TYPE sys_core::SysNodeObj {
      CREATE MULTI LINK actions: sys_core::SysNodeObjAction {
          ON SOURCE DELETE ALLOW;
      };
  };
  CREATE TYPE sys_core::SysNodeObjChild {
      CREATE REQUIRED LINK nodeObj: sys_core::SysNodeObj {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY orderDefine: default::nonNegative;
  };
  ALTER TYPE sys_core::SysNodeObj {
      CREATE MULTI LINK children: sys_core::SysNodeObjChild {
          ON SOURCE DELETE ALLOW;
      };
      CREATE LINK systemQuerySource: sys_core::SysSystem;
  };
  CREATE TYPE sys_migr::SysMigrTargetColumn EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK column: sys_db::SysColumn;
      CREATE REQUIRED PROPERTY expr: std::str;
      CREATE PROPERTY isActive: std::bool;
      CREATE REQUIRED PROPERTY orderDefine: default::nonNegative;
  };
  CREATE TYPE sys_migr::SysMigrTargetTable EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK table: sys_db::SysTable;
      CREATE MULTI LINK columns: sys_migr::SysMigrTargetColumn {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE PROPERTY isActive: std::bool;
      CREATE PROPERTY isInitTable: std::bool;
      CREATE REQUIRED PROPERTY orderDefine: default::nonNegative;
  };
  ALTER TYPE sys_migr::SysMigr {
      CREATE MULTI LINK tablesSource: sys_migr::SysMigrSourceTable {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK tablesTarget: sys_migr::SysMigrTargetTable {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_rep::SysAnalytic {
      CREATE MULTI LINK parms: sys_rep::SysRepParm {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK statuses: sys_rep::SysAnalyticStatus {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE TYPE sys_rep::SysRepUserParm EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK parm: sys_rep::SysRepParm {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE PROPERTY parmValue: std::json;
  };
  CREATE TYPE sys_rep::SysRepUserAnalytic EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK analytic: sys_rep::SysAnalytic {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE MULTI LINK parms: sys_rep::SysRepUserParm {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE TYPE sys_rep::SysRepUser EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK report: sys_rep::SysRep {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE MULTI LINK analytics: sys_rep::SysRepUserAnalytic {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK parms: sys_rep::SysRepUserParm {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE REQUIRED LINK user: sys_user::SysUser;
      CREATE PROPERTY descriptionUser: std::str;
      CREATE REQUIRED PROPERTY headerUser: std::str;
      CREATE REQUIRED PROPERTY orderDefine: default::nonNegative;
  };
  CREATE TYPE sys_test::Person {
      CREATE REQUIRED PROPERTY name: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE TYPE sys_test::Movie {
      CREATE MULTI LINK actors: sys_test::Person;
      CREATE PROPERTY title: std::str;
  };
  ALTER TYPE sys_user::SysUserType {
      CREATE LINK users := (.<userTypes[IS sys_user::SysUser]);
  };
  ALTER TYPE sys_user::SysUserAction {
      CREATE MULTI LINK actionConfirms: sys_user::SysUserActionConfirm {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
