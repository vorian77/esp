CREATE MIGRATION m1p5an4ngfe2d5uq5ehvcnbhs77m4v4ftblq326h3t2ey65mlgpudq
    ONTO m1idax6xmowojipz2osymv6gre4kyhk54qcemnzxa5swuervrf4n4a
{
  ALTER TYPE org_moed::MoedPartData {
      DROP LINK participant;
  };
  DROP TYPE org_moed::MoedPartDoc;
  DROP TYPE org_moed::MoedPartNote;
  DROP TYPE org_moed::MoedPartData;
  DROP TYPE org_moed::MoedParticipant;
};
