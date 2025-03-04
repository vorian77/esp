CREATE MIGRATION m1vk4r6ds73vidkrvdwbttsf2qv35r3mwmgmxiynyvaxjlrk7ruc3q
    ONTO m1ggg56hxvgwveyp4jpk672t3dr4ilejferee2el74ow4k6qa6anba
{
  ALTER TYPE org_moed::MoedParticipant {
      ALTER LINK office {
          SET MULTI;
      };
  };
};
