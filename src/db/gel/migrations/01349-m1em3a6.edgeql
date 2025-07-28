CREATE MIGRATION m1em3a676443y3zpt2fejaywssw6drtnc7ghzjlgnixccclq6bcr2a
    ONTO m1go23ngyse7lapigsu7qbu6mj7qoftemyldrcqvtmzt7us7pjlafa
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      CREATE LINK objAttrCmProgram: sys_core::SysObjAttr;
  };
};
