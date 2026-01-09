import ticket from "#models/ticket";

async function findById(request, response, next) {
  try {
    const { id } = request.params;

    const ticketFound = await ticket.findById(id);

    return response.status(200).json(ticketFound);
  } catch (error) {
    next(error);
  }
}

async function findMany(request, response, next) {
  try {
    const result = await ticket.findMany(request.query);

    return response.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function create(request, response, next) {
  try {
    const createdTicket = await ticket.create(request.body);

    return response.status(201).json(createdTicket);
  } catch (error) {
    next(error);
  }
}

async function update(request, response, next) {
  try {
    const updatedTicket = await ticket.update({
      id: request.params.id,
      ...request.body,
    });

    return response.status(200).json(updatedTicket);
  } catch (error) {
    next(error);
  }
}

async function remove(request, response, next) {
  try {
    await ticket.remove(request.params.id);

    return response.status(204).send();
  } catch (error) {
    next(error);
  }
}

const ticketController = {
  findById,
  findMany,
  create,
  update,
  remove,
};

export default ticketController;
