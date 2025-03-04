CREATE MIGRATION m1ggg56hxvgwveyp4jpk672t3dr4ilejferee2el74ow4k6qa6anba
    ONTO m12tnnihm45y6weis33whre4vl6aowtznclzrskeykw6farvxburvq
{
  ALTER TYPE org_moed::MoedParticipant {
      CREATE LINK office: sys_core::SysObjEnt;
  };
};
