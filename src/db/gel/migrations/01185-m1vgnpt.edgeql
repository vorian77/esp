CREATE MIGRATION m1vgnptn4iyegnf7b7yvhmothfjiyazhe54nlqhv4ww5dq6wnwvjxq
    ONTO m1utyxasioh3jlbhh5gtjturstdjgnaxqlvj2v6npuuo6gzaptjmbq
{
  ALTER TYPE sys_user::SysUser {
      ALTER CONSTRAINT std::exclusive ON (.name) {
          DROP OWNED;
      };
  };
};
