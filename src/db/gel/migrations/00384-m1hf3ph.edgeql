CREATE MIGRATION m1hf3ph5xnhvru3rg5gewuihcrzwrnxiiks7doyviass2lynzf6zuq
    ONTO m1o6yny6mpscixrknk6baioeythuxomqylbqiaczv5pckvdmnkj2va
{
                  DROP FUNCTION sys_rep::getAnalytic(name: std::str);
  DROP FUNCTION sys_rep::getReport(name: std::str);
  ALTER TYPE sys_rep::SysAnalytic {
      DROP CONSTRAINT std::exclusive ON (.name);
      DROP LINK parms;
      DROP LINK statuses;
      DROP PROPERTY description;
  };
  DROP TYPE sys_rep::SysRepUserAnalytic;
  ALTER TYPE sys_rep::SysRep {
      DROP LINK analytics;
      DROP CONSTRAINT std::exclusive ON (.name);
      DROP LINK elements;
      DROP LINK parms;
      DROP LINK table;
      DROP PROPERTY description;
      DROP PROPERTY exprFilter;
  };
  DROP TYPE sys_rep::SysAnalytic;
  DROP TYPE sys_rep::SysAnalyticStatus;
  DROP TYPE sys_rep::SysRepUser;
  DROP TYPE sys_rep::SysRep;
  ALTER TYPE sys_rep::SysRepEl {
      DROP LINK codeDataType;
      DROP LINK codeType;
      DROP LINK column;
      DROP PROPERTY description;
      DROP PROPERTY expr;
      DROP PROPERTY header;
      DROP PROPERTY isDisplay;
      DROP PROPERTY isDisplayable;
      DROP PROPERTY name;
      DROP PROPERTY order;
  };
  DROP TYPE sys_rep::SysRepUserEl;
  DROP TYPE sys_rep::SysRepEl;
  ALTER TYPE sys_rep::SysRepParm {
      DROP LINK codeParmType;
      DROP LINK fieldListItems;
      DROP LINK linkTable;
      DROP PROPERTY description;
      DROP PROPERTY fieldListItemsParmName;
      DROP PROPERTY header;
      DROP PROPERTY isMultiSelect;
      DROP PROPERTY name;
      DROP PROPERTY order;
  };
  DROP TYPE sys_rep::SysRepUserParm;
  DROP TYPE sys_rep::SysRepParm;
};
