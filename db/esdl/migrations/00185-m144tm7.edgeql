CREATE MIGRATION m144tm7rmx2o7dsywlrdyvaexmnyehe3zjixsiahyj24dx5io5htxq
    ONTO m177w4jawm2kog2ripgpoorg43hfza3ufkrlkfhszclptmzbp7wo6a
{
                  ALTER TYPE sys_core::SysDataObjAction {
      ALTER LINK codeActionEnable {
          RENAME TO codeActionsEnable;
      };
  };
  ALTER TYPE sys_core::SysDataObjAction {
      ALTER LINK codeActionShow {
          RENAME TO codeActionsShow;
      };
  };
};
