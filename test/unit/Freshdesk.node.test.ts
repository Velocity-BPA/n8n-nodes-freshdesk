/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { Freshdesk } from '../../nodes/Freshdesk/Freshdesk.node';

describe('Freshdesk Node', () => {
	let freshdesk: Freshdesk;

	beforeEach(() => {
		freshdesk = new Freshdesk();
	});

	describe('Node Description', () => {
		it('should have the correct name', () => {
			expect(freshdesk.description.name).toBe('freshdesk');
		});

		it('should have the correct display name', () => {
			expect(freshdesk.description.displayName).toBe('Freshdesk');
		});

		it('should have version 1', () => {
			expect(freshdesk.description.version).toBe(1);
		});

		it('should require freshdeskApi credentials', () => {
			expect(freshdesk.description.credentials).toEqual([
				{
					name: 'freshdeskApi',
					required: true,
				},
			]);
		});

		it('should have one input and one output', () => {
			expect(freshdesk.description.inputs).toHaveLength(1);
			expect(freshdesk.description.outputs).toHaveLength(1);
		});
	});

	describe('Resources', () => {
		it('should have 10 resources', () => {
			const resourceProperty = freshdesk.description.properties.find(
				(p) => p.name === 'resource',
			);
			expect(resourceProperty).toBeDefined();
			expect(resourceProperty?.type).toBe('options');
			
			const options = resourceProperty?.options as { value: string }[];
			expect(options).toHaveLength(10);
		});

		it('should have ticket as the default resource', () => {
			const resourceProperty = freshdesk.description.properties.find(
				(p) => p.name === 'resource',
			);
			expect(resourceProperty?.default).toBe('ticket');
		});

		it('should include all required resources', () => {
			const resourceProperty = freshdesk.description.properties.find(
				(p) => p.name === 'resource',
			);
			const options = resourceProperty?.options as { value: string }[];
			const resourceValues = options?.map((o) => o.value) || [];

			expect(resourceValues).toContain('ticket');
			expect(resourceValues).toContain('contact');
			expect(resourceValues).toContain('company');
			expect(resourceValues).toContain('agent');
			expect(resourceValues).toContain('group');
			expect(resourceValues).toContain('conversation');
			expect(resourceValues).toContain('cannedResponse');
			expect(resourceValues).toContain('solution');
			expect(resourceValues).toContain('timeEntry');
			expect(resourceValues).toContain('product');
		});
	});

	describe('Load Options Methods', () => {
		it('should have getAgents method', () => {
			expect(freshdesk.methods.loadOptions.getAgents).toBeDefined();
		});

		it('should have getGroups method', () => {
			expect(freshdesk.methods.loadOptions.getGroups).toBeDefined();
		});

		it('should have getProducts method', () => {
			expect(freshdesk.methods.loadOptions.getProducts).toBeDefined();
		});

		it('should have getCompanies method', () => {
			expect(freshdesk.methods.loadOptions.getCompanies).toBeDefined();
		});

		it('should have getSolutionCategories method', () => {
			expect(freshdesk.methods.loadOptions.getSolutionCategories).toBeDefined();
		});

		it('should have getSolutionFolders method', () => {
			expect(freshdesk.methods.loadOptions.getSolutionFolders).toBeDefined();
		});

		it('should have getCannedResponseFolders method', () => {
			expect(freshdesk.methods.loadOptions.getCannedResponseFolders).toBeDefined();
		});

		it('should have getRoles method', () => {
			expect(freshdesk.methods.loadOptions.getRoles).toBeDefined();
		});
	});

	describe('Properties', () => {
		it('should have subtitle with operation and resource', () => {
			expect(freshdesk.description.subtitle).toBe(
				'={{$parameter["operation"] + ": " + $parameter["resource"]}}',
			);
		});

		it('should have an icon', () => {
			expect(freshdesk.description.icon).toBe('file:freshdesk.svg');
		});

		it('should be in the transform group', () => {
			expect(freshdesk.description.group).toContain('transform');
		});
	});
});
