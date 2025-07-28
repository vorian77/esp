CREATE MIGRATION m1go23ngyse7lapigsu7qbu6mj7qoftemyldrcqvtmzt7us7pjlafa
    ONTO m1posfo3y5t5auzkfsxqkkd4dazja42kmmojfj72viq7aksjftc6uq
{
  ALTER TYPE sys_core::SysNodeObj {
      CREATE LINK systemQuerySource: sys_core::SysSystem;
  };
};
