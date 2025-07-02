CREATE MIGRATION m1fzittmlhm5yxtrj5vrhzfoib5uolgbq54rbqchwdqzitlqsxlmaa
    ONTO m1ybi7ktfjsdoifh7kv35oaexusvfixgzj32tewgsfa4uaet3k6ucq
{
  CREATE MODULE org_client_city_baltimore IF NOT EXISTS;
  ALTER TYPE org_client_city_of_baltimore::MoedPartData RENAME TO org_client_city_baltimore::MoedPartData;
  ALTER TYPE org_client_city_of_baltimore::MoedParticipant RENAME TO org_client_city_baltimore::MoedParticipant;
  DROP MODULE org_client_city_of_baltimore;
};
