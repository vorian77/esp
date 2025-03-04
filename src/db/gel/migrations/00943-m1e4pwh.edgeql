CREATE MIGRATION m1e4pwhbzgttbrcr4iabp6skbgapw2zexnwukp53ij4asmxu2qe4nq
    ONTO m1gvd7zstty72epedsqoqomcjwj2euvoi7jo2vqj4m4za5psujhwoa
{
  ALTER TYPE org_moed::MoedParticipant {
      DROP LINK office;
  };
};
