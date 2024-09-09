import { Acceleration, Circle, Color, IsCentralMass, Mass, Position, Velocity } from '../components';
import { CONSTANTS } from '../constants';

let inited = false;

export const init = ({ world }: { world: Koota.World }) => {
	if (inited) return;

	for (let i = 0; i < CONSTANTS.NBODIES; i++) {
		const entity = world.spawn(Position, Velocity, Mass, Circle, Color, Acceleration);

		// Make the first entity the central mass.
		if (i === 0) entity.add(IsCentralMass);
	}

	inited = true;
};
