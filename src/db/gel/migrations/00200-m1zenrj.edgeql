CREATE MIGRATION m1zenrjw4dvlacjsoe4madtvgogggg6ju42kysn6fek7piofva6z7a
    ONTO m1ge6xlquxsck3fomhdo45zbijwaa3wwq3svpcclmlngo5pgc2v3ja
{
                              ALTER TYPE sys_core::SysDataObjAction {
      DROP LINK codeActionConfirmTrigger;
  };
};
