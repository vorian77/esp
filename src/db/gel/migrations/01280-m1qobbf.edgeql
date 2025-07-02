CREATE MIGRATION m1qobbflouytlx6mkvxqxyd3knvu7p2v7gpa6llxt3t4bfkfwpz6ya
    ONTO m1vuebe37z5465z72nd6f5pytzcyvl6hbwlv3co6fzpjr62pipqs7q
{
  CREATE MODULE org_client_city_of_baltimore IF NOT EXISTS;
  ALTER TYPE org_client_moed::MoedPartData RENAME TO org_client_city_of_baltimore::MoedPartData;
  ALTER TYPE org_client_moed::MoedParticipant RENAME TO org_client_city_of_baltimore::MoedParticipant;
  DROP MODULE org_client_moed;
};
