CREATE MIGRATION m1mikbvdi25o3c2ag5qu327o5iamqjhjlqhl6tk5rkggeacgmmqsyq
    ONTO m1iskz4vr2rfdti6zubp5sqnew3pgg73uhezs3xgjfucilyfj3igaq
{
  CREATE MODULE org_client_baltimore IF NOT EXISTS;
  ALTER TYPE org_client_city_baltimore::MoedPartData RENAME TO org_client_baltimore::MoedPartData;
  ALTER TYPE org_client_city_baltimore::MoedParticipant RENAME TO org_client_baltimore::MoedParticipant;
  ALTER TYPE sys_core::SysNodeObj {
      DROP LINK codeQueryOwnerType;
  };
  DROP MODULE org_client_city_baltimore;
};
