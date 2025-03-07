CREATE MIGRATION m1s7jusqppesgim2xx45jf3jrvcpvf3q7sdbg2lojg5ksbc2bp3myq
    ONTO m14m2hsp3wg5unpjerqeux5ixnsllmzaq3tuzk4gdsknptbq5yaf4a
{
  CREATE MODULE org_client_moed IF NOT EXISTS;
  ALTER TYPE org_moed::MoedPartData RENAME TO org_client_moed::MoedPartData;
  ALTER TYPE org_moed::MoedParticipant RENAME TO org_client_moed::MoedParticipant;
  DROP MODULE org_moed;
};
