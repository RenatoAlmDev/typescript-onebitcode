const spaceships = [];

function addSpaceship(name: string, pilot: string, crewLimit: number) {
  const spaceship = {
    name,
    pilot,
    crewLimit,
    crew: [],
    inMission: false,
  };

  spaceships.push(spaceship);

  alert(`A Nave ${spaceship.name} foi registrada`);
}

function findSpaceship(name: string) {
  let spaceship: {
    name: string;
    pilot: string;
    crewLimit: number;
    crew: string[];
    inMission: boolean;
  };

  spaceship = spaceships.find((ship) => ship.name === name);

  return spaceship;
}

function addCrewMember(
  member: string,
  spaceship: { name: string; crewLimit: number; crew: string[] }
) {
  if (spaceship.crew.length >= spaceship.crewLimit) {
    alert(`${member} não pode ser adicionado, limite de tripulação atingido`);
  } else {
    spaceship.crew.push(member);
    alert(`${member} adicionado à tripulação de ${spaceship.name}`);
  }
}

function sendInMission(spaceship: {
  name: string;
  crewLimit: number;
  crew: string[];
  inMission: boolean;
}) {
  if (spaceship.inMission) {
    alert(`${spaceship.name} já está em uma missão`);
  } else if (spaceship.crew.length < Math.floor(spaceship.crewLimit / 3)) {
    alert(
      `${spaceship.name} não pode ser enviada, tripulação insuficiente para missão`
    );
  } else {
    spaceship.inMission = true;
    alert(`${spaceship.name} enviada em missão com sucesso!`);
  }
}

function firstMenuOption() {
  const name = prompt("Qual é o nome da nava a ser registrada?");
  const pilot = prompt(`Insira o nome do piloto da ${name}`);
  const crewLimit = Number(prompt(`Quantos tripulantes a ${name} suporta?`));

  const confirmation = confirm(
    `Confirma o registro da nave?\nNome: ${name} \nPiloto: ${pilot} \nLimite de Tripulação: ${crewLimit}`
  );

  if (confirmation) {
    addSpaceship(name, pilot, crewLimit);
  }
}

function secondMenuOption() {
  const member = prompt("Qual é o nome do tripulante?");
  const spaceshipName = prompt(`Para qual nave ${member} será desiginado?`);

  const spaceship = findSpaceship(spaceshipName);

  if (spaceship) {
    const confirmation = confirm(
      `Confirma a inclusão de ${member} na tripulação de ${spaceship.name}?`
    );

    if (confirmation) {
      addCrewMember(member, spaceship);
    }
  }
}

function thirdMenuOption() {
  const spaceshipName = prompt("Qual o nome da nave a ser enviada?");

  const spaceship = findSpaceship(spaceshipName);

  if (spaceship) {
    const confirmation = confirm(
      `Confirma o envio da ${spaceship.name} em missão?`
    );

    if (confirmation) {
      sendInMission(spaceship);
    }
  }
}

function fourthMenuOption() {
  let list = "Naves Registradas:\n";

  spaceships.forEach(
    (spaceship: {
      name: String;
      pilot: String;
      crewLimit: Number;
      crew: string[];
      inMission: Boolean;
    }) => {
      list += `Nave: ${spaceship.name} \nPiloto: ${
        spaceship.pilot
      } \nEm missão? ${
        spaceship.inMission ? "Sim" : "Não"
      } \nTamanho Máximo da Tripulação: ${spaceship.crewLimit} \nTripulantes: ${
        spaceship.crew.length
      }`;

      spaceship.crew.forEach((member) => {
        list += ` - ${member}\n`;
      });
    }
  );

  alert(list);
}

let userOption = 0;

while (userOption !== 5) {
  const menu = `Painel Principal
    1 - Registrar uma nova nave
    2 - Adicionar membro da tripulação
    3 - Enviar nave em missão
    4 - Listar naves registradas
    5 - Encerrar
  `;

  userOption = Number.parseInt(prompt(menu));

  switch (userOption) {
    case 1:
      firstMenuOption();
      break;
    case 2:
      secondMenuOption();
      break;
    case 3:
      thirdMenuOption();
      break;
    case 4:
      fourthMenuOption();
      break;
    case 5:
      alert("Encerrando o sistema...");
      break;
    default:
      alert("Opção inválida! Retornando ao painel principal...");
      break;
  }
}
