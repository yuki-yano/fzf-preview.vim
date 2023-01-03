local M = {}

local lsp = vim.lsp

function M.nvim_lsp_references()
  vim.g.fzf_preview_nvim_lsp_references = nil

  local method = 'textDocument/references'
  ---@diagnostic disable-next-line: missing-parameter
  local params = lsp.util.make_position_params()
  params.context = { includeDeclaration = false }
  local response = lsp.buf_request_sync(0, method, params, 1000)

  if response == nil or vim.tbl_isempty(response) then
    print('No location found: ' .. method)
    return
  end

  local result = {}
  for _, v in pairs(response) do
    vim.list_extend(result, v.result)
  end
  vim.g.fzf_preview_nvim_lsp_references = result
end

function M.nvim_lsp_diagnostics()
  vim.g.fzf_preview_nvim_lsp_diagnostics = vim.diagnostic.get()
end

function M.nvim_lsp_current_diagnostics()
  vim.g.fzf_preview_nvim_lsp_current_diagnostics = vim.diagnostic.get(0)
end

function M.nvim_lsp_definition()
  vim.g.fzf_preview_nvim_lsp_definition = nil

  local method = 'textDocument/definition'
  ---@diagnostic disable-next-line: missing-parameter
  local params = lsp.util.make_position_params()
  local response = lsp.buf_request_sync(0, method, params, 1000)

  if response == nil or vim.tbl_isempty(response) then
    print('No location found: ' .. method)
    return
  end

  local result = {}
  for _, v in pairs(response) do
    vim.list_extend(result, v.result)
  end
  vim.g.fzf_preview_nvim_lsp_definition = result
end

function M.nvim_lsp_type_definition()
  vim.g.fzf_preview_nvim_lsp_type_definition = nil

  local method = 'textDocument/typeDefinition'
  ---@diagnostic disable-next-line: missing-parameter
  local params = lsp.util.make_position_params()
  local response = lsp.buf_request_sync(0, method, params, 1000)

  if response == nil or vim.tbl_isempty(response) then
    print('No location found: ' .. method)
    return
  end

  local result = {}
  for _, v in pairs(response) do
    vim.list_extend(result, v.result)
  end
  vim.g.fzf_preview_nvim_lsp_type_definition = result
end

function M.nvim_lsp_implementations()
  vim.g.fzf_preview_nvim_lsp_implementations = nil

  local method = 'textDocument/implementation'
  ---@diagnostic disable-next-line: missing-parameter
  local params = lsp.util.make_position_params()
  local response = lsp.buf_request_sync(0, method, params, 1000)

  if response == nil or vim.tbl_isempty(response) then
    print('No location found: ' .. method)
    return
  end

  local result = {}
  for _, v in pairs(response) do
    vim.list_extend(result, v.result)
  end
  vim.g.fzf_preview_nvim_lsp_implementations = result
end

return M
