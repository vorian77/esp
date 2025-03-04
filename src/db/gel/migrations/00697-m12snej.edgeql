CREATE MIGRATION m12snej6wprhe2l3ni7zalm3t5bnz5wgxprkzgou7af2gqlpfpensq
    ONTO m17e25xuosdgfb3eejwl27ipczwbkq5qievg6k7klrgf6pmclfn6ra
{
              CREATE TYPE org_moed::MoedPartData EXTENDING sys_core::SysObj {
      CREATE LINK participant: org_moed::MoedParticipant;
  };
};
