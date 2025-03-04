CREATE MIGRATION m1b4swb6o5v6g7s5na77nusha3kmhp4ilulu6osm2kreq2c7bxi3ta
    ONTO m1bou7sz7lnhy5caxtbh2hjbmdoah3yx4vqqdfbvhltvizfuzl65nq
{
                  ALTER TYPE sys_core::SysDataObjFieldListSelect {
      CREATE PROPERTY isListEdit: std::bool;
  };
};
