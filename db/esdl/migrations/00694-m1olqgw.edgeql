CREATE MIGRATION m1olqgwhdlxrs7gfpyzx357pjajy37su26xquu2xrotyonejepj3xq
    ONTO m1nhw53cmc2p6zrklieuorbwp46hoqypz2nk5jbckx2uceiuvkdsha
{
  CREATE TYPE org_moed::MoedPartData EXTENDING sys_core::SysObj {
      CREATE REQUIRED LINK participant: org_moed::MoedParticipant;
  };
};
