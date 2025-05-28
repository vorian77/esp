CREATE MIGRATION m1mdre42ou6luwtzbrz56inl7eos52h6alos4pvnlmvqgjhg2hg2yq
    ONTO m1jd7lc6i354jga2p4j2v4ytsduceqc5sco2633xrm5gp4gfguhe5a
{
  ALTER TYPE sys_core::ObjRootCore {
      ALTER PROPERTY name {
          SET REQUIRED USING (<std::str>{});
      };
  };
  CREATE TYPE default::SysPerson1 EXTENDING sys_core::SysObjAttr {
      CREATE REQUIRED PROPERTY firstName: default::Name;
      CREATE REQUIRED PROPERTY lastName: default::Name;
  };
};
