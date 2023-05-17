export const Conditions: {[k: string]: ModdedConditionData} = {
	gem: {
		duration: 1,
		affectsFainted: true,
		onBasePower(basePower, user, target, move) {
			this.debug('Gem Boost');
			return this.chainModify(1.5);
		},
	},
snow: {
	name: 'Snow',
	effectType: 'Weather',
	duration: 5,
	durationCallback(source, effect) {
		if (source?.hasItem('icyrock')) {
			return 8;
		}
		return 5;
	},
	onModifyDefPriority: 10,
	onModifyDef(def, pokemon) {
		if (pokemon.hasType('Ice') && this.field.isWeather('snow')) {
			return this.modify(def, 1.5);
		}
	},
	onFieldStart(field, source, effect) {
		if (effect?.effectType === 'Ability') {
			if (this.gen <= 5) this.effectState.duration = 0;
			this.add('-weather', 'Snow', '[from] ability: ' + effect.name, '[of] ' + source);
		} else {
			this.add('-weather', 'Snow');
		}
	},
	onFieldResidualOrder: 1,
	onFieldResidual() {
		this.add('-weather', 'Snow', '[upkeep]');
		if (this.field.isWeather('snow')) this.eachEvent('Weather');
	},
	onFieldEnd() {
		this.add('-weather', 'none');
	},
},
};