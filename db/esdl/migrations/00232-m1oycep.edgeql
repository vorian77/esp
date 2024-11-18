CREATE MIGRATION m1oycepvbtxaf4euceyxm5unalvjjj375bd7nh3sgx633743g4li4q
    ONTO m15qqo4ik6nyi3pfwbnbixpzmlskxtwdvsvuj2fp4hd4tovmgw6uba
{
                  ALTER FUNCTION sys_core::getDataObjAction(dataObjActionName: std::str) {
      RENAME TO sys_core::getDataObjActionField;
  };
  ALTER FUNCTION sys_core::getDataObjActionGroup(name: std::str) {
      RENAME TO sys_core::getDataObjActionFieldGroup;
  };
};
