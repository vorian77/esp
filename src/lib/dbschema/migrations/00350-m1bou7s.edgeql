CREATE MIGRATION m1bou7sz7lnhy5caxtbh2hjbmdoah3yx4vqqdfbvhltvizfuzl65nq
    ONTO m1s6o5rv6v6hgpru5kbrjww24fmam3h3ssvxqltuiosfcq6v632agq
{
  ALTER TYPE sys_core::SysDataObjFieldListSelect {
      CREATE PROPERTY isAutoSelect: std::bool;
  };
};
