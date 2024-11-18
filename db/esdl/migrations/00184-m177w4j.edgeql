CREATE MIGRATION m177w4jawm2kog2ripgpoorg43hfza3ufkrlkfhszclptmzbp7wo6a
    ONTO m1hbzgnomm7t7bvrbxtosevcukymijexu2lgslzemdagtuka4jqfya
{
                  ALTER TYPE sys_core::SysDataObjAction {
      CREATE MULTI LINK codeActionEnable: sys_core::SysCode;
      CREATE MULTI LINK codeActionShow: sys_core::SysCode;
  };
};
