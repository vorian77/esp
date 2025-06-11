CREATE MIGRATION m1z4vegji7awtzmsuzrksxi6yafuejfnjs5wqfmenmoi5gmsownrpa
    ONTO m1xtvoygtuegygz5turpkxst7xdjzc62ebdc5bqwootwzea5lagi3q
{
  ALTER TYPE sys_core::SysNodeObjAction {
      CREATE CONSTRAINT std::exclusive ON ((.codeAction, .nodeObj));
  };
  ALTER TYPE sys_core::SysNodeObjConfig {
      CREATE CONSTRAINT std::exclusive ON ((.codeAttrType, .nodeObj));
  };
};
